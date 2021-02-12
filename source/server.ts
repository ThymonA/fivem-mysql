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

import { console, Tracer } from 'tracer';
import { GetLoggerConfig, GetSlowQueryWarning } from './tracer';
import { MySQLServer, CFXCallback, OkPacket, ConnectionString, keyValue } from './mysql';

let isReady = false;

global.exports('isReady', (): boolean => { return isReady; });

const rawConnectionString = GetConvar('mysql_connection_string', 'mysql://root@localhost/fivem');
const connectionString = ConnectionString(rawConnectionString);
const slowQueryWarning = GetSlowQueryWarning();
const logger = console(GetLoggerConfig());
const server = new MySQLServer(connectionString, logger, () => { isReady = true; });

function warnIfNeeded(time: [number, number], logger: Tracer.Logger, sql: string, resource: string, interval: number) {
    const queryTime = time[0] * 1e3 + time[1] * 1e-6;

    if (interval <= 0 || interval > queryTime) { return; }

    logger.warn(`Resource '${resource}' executed an query that took ${queryTime.toFixed()}ms to execute\n> ^4Query: ^7${sql}\n> ^4Execution time: ^7${queryTime.toFixed()}ms`);
}

global.exports('executeAsync', (query: string, parameters?: keyValue, callback?: CFXCallback, resource?: string): void => {
    const startTime = process.hrtime();

    resource = resource ?? GetInvokingResource();

    server.execute(query, parameters, (result, sql) => {
        warnIfNeeded(process.hrtime(startTime), logger, sql, resource, slowQueryWarning);
        callback(result);
    }, resource);
});

global.exports('insertAsync', (query: string, parameters?: keyValue, callback?: CFXCallback, resource?: string): void => {
    const startTime = process.hrtime();

    resource = resource ?? GetInvokingResource();

    server.execute(query, parameters, (result, sql) => {
        warnIfNeeded(process.hrtime(startTime), logger, sql, resource, slowQueryWarning);
        callback((<OkPacket>result)?.insertId ?? 0);
    }, resource);
});

global.exports('fetchAllAsync', (query: string, parameters?: keyValue, callback?: CFXCallback, resource?: string): void => {
    const startTime = process.hrtime();

    resource = resource ?? GetInvokingResource();

    server.execute(query, parameters, (result, sql) => {
        warnIfNeeded(process.hrtime(startTime), logger, sql, resource, slowQueryWarning);
        callback(result);
    }, resource);
});

global.exports('fetchScalarAsync', (query: string, parameters?: keyValue, callback?: CFXCallback, resource?: string): void => {
    const startTime = process.hrtime();

    resource = resource ?? GetInvokingResource();

    server.execute(query, parameters, (result, sql) => {
        warnIfNeeded(process.hrtime(startTime), logger, sql, resource, slowQueryWarning);
        callback((result && result[0]) ? (Object.values(result[0])[0] ?? null) : null);
    }, resource);
});

global.exports('fetchFirstAsync', (query: string, parameters?: keyValue, callback?: CFXCallback, resource?: string): void => {
    const startTime = process.hrtime();

    resource = resource ?? GetInvokingResource();

    server.execute(query, parameters, (result, sql) => {
        warnIfNeeded(process.hrtime(startTime), logger, sql, resource, slowQueryWarning);
        callback((result && result[0]) ? result[0] ?? [] : []);
    }, resource);
});