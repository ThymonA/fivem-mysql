/**
𝗙𝗶𝘃𝗲𝗠 𝗠𝘆𝗦𝗤𝗟 - 𝗠𝘆𝗦𝗤𝗟 𝗹𝗶𝗯𝗿𝗮𝗿𝘆 𝗳𝗼𝗿 𝗙𝗶𝘃𝗲𝗠
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
➤ License:      https://choosealicense.com/licenses/gpl-3.0/
➤ GitHub:       https://github.com/ThymonA/fivem-mysql/
➤ Author:       Thymon Arens <ThymonA>
➤ Name:         FiveM MySQL
➤ Version:      1.0.0
➤ Description:  MySQL library made for FiveM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
𝗚𝗡𝗨 𝗚𝗲𝗻𝗲𝗿𝗮𝗹 𝗣𝘂𝗯𝗹𝗶𝗰 𝗟𝗶𝗰𝗲𝗻𝘀𝗲 𝘃𝟯.𝟬
┳
┃ Copyright (C) 2020 Thymon Arens <ThymonA>
┃
┃ This program is free software: you can redistribute it and/or modify
┃ it under the terms of the GNU General Public License as published by
┃ the Free Software Foundation, either version 3 of the License, or
┃ (at your option) any later version.
┃
┃ This program is distributed in the hope that it will be useful,
┃ but WITHOUT ANY WARRANTY; without even the implied warranty of
┃ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
┃ GNU General Public License for more details.
┃
┃ You should have received a copy of the GNU General Public License
┃ along with this program.  If not, see <https://www.gnu.org/licenses/>.
┻
*/

import { CFXCallback, OkPacket, RowDataPacket, ResultSetHeader } from '../fivem/callback';
import MySQLHelper from './helpers';
import { Pool, PoolOptions, ConnectionOptions, QueryError, createPool } from 'mysql2';

declare type keyValue = { [key: string]: any };

class MySQLServer {
    ready: boolean = false;
    options: PoolOptions;
    pool: Pool;

    constructor(connectionOptions: ConnectionOptions, readyCallback?: Function) {
        this.options = {
            ...connectionOptions,
            ...{
                waitForConnections: true,
                connectionLimit: 20,
                queueLimit: 0,
                enableKeepAlive: true,
                namedPlaceholders: true
            }
        } as PoolOptions;

        this.pool = createPool(this.options);
        this.ready = true;

        if (readyCallback !== null && typeof readyCallback !== 'undefined') {
            readyCallback();
        }
    }

    beginTransaction(callback: CFXCallback) {
        return this.pool.beginTransaction((err) => {
            if (err) {
                callback(false);
                return;
            }

            callback([]);
        });
    }

    commit(callback: CFXCallback) {
        return this.pool.commit((err) => {
            err ? callback(false) : callback([]);
        });
    }

    rollback(callback: CFXCallback) {
        return this.pool.rollback(() => callback([]));
    }

    end() { this.pool?.end(); }

    execute(query: string, parameters: keyValue, callback: CFXCallback) {
        const config = this.pool?.config;
        
        parameters = MySQLHelper.fixParameters(parameters, config?.stringifyObjects, config?.timezone);
        query = MySQLHelper.fixQuery(query);

        const sql = this.pool?.format(query, parameters);

        return this.pool?.query(sql, parameters, (err, result) => {
            err ? this.errorCallback(err, callback) : callback(result);
        });
    }

    errorCallback(error: QueryError, callback: CFXCallback, rollback?: boolean) {
        rollback ? this.pool.rollback(() => callback([])) : callback([]);
        console.error(error.message);
    }

    isReady() { return this.ready; }
}

export {
    MySQLServer,
    CFXCallback,
    OkPacket,
    RowDataPacket,
    ResultSetHeader,
    keyValue
};