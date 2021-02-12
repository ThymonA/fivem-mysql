/**
𝗙𝗶𝘃𝗲𝗠 𝗠𝘆𝗦𝗤𝗟 - 𝗠𝘆𝗦𝗤𝗟 𝗹𝗶𝗯𝗿𝗮𝗿𝘆 𝗳𝗼𝗿 𝗙𝗶𝘃𝗲𝗠
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
➤ License:      https://choosealicense.com/licenses/gpl-3.0/
➤ GitHub:       https://github.com/ThymonA/fivem-mysql/
➤ Author:       Thymon Arens <ThymonA>
➤ Name:         FiveM MySQL
➤ Version:      1.0.2
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
import { Tracer } from 'tracer';
import { Pool, PoolOptions, ConnectionOptions, QueryError, createPool, QueryOptions } from 'mysql2';

declare type keyValue = { [key: string]: any };

class MySQLServer {
    ready: boolean = false;
    options: PoolOptions;
    pool: Pool;
    logger: Tracer.Logger;

    constructor(connectionOptions: ConnectionOptions, logger: Tracer.Logger, readyCallback?: Function) {
        this.logger = logger;
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

    beginTransaction(callback: CFXCallback, resource: string) {
        return this.pool.beginTransaction((err) => {
            err ? this.errorCallback(err, callback, resource) : callback([]);
        });
    }

    commit(callback: CFXCallback, resource: string) {
        return this.pool.commit((err) => {
            err ? this.errorCallback(err, callback, resource) : callback([]);
        });
    }

    rollback(callback: CFXCallback) {
        return this.pool.rollback(() => callback([]));
    }

    end(resource: string) {
        this.pool?.end((err) => {
            if (err) {
                this.logger.error(`Resource '${resource}' throw an SQL error\n> ^1Message: ^7${err.message}`);
            }
        });
    }

    execute(query: string, parameters: keyValue, callback: CFXCallback, resource: string) {
        return this.pool?.query({
            sql: this.pool.format(query, parameters),
            values: parameters,
            nestTables: false,
            typeCast: true
        } as QueryOptions, parameters, (err, result) => {
            err ? this.errorCallback(err, callback, resource, query) : callback(result, query);
        });
    }

    errorCallback(error: QueryError, callback: CFXCallback, resource: string, query?: string) {
        this.logger.error(`Resource '${resource}' throw an SQL error\n> ^1Message: ^7${error.message}`);
        callback([], query);
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