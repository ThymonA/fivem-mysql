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
import { MySQLServer, CFXCallback, OkPacket, ConnectionString, keyValue } from './mysql';

let isReady = false;

global.exports('isReady', (): boolean => { return isReady; });

const rawConnectionString = GetConvar('mysql_connection_string', 'mysql://root@localhost/fivem');
const connectionString = ConnectionString(rawConnectionString);
const server = new MySQLServer(connectionString, () => { isReady = true; });
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

global.exports('insertAsync', (query: string, parameters?: keyValue, callback?: CFXCallback): void => {
    server.execute(query, parameters, (result) => {
        callback((<OkPacket>result)?.insertId ?? 0);
    });
});

global.exports('fetchAllAsync', (query: string, parameters?: keyValue, callback?: CFXCallback): void => {
    server.execute(query, parameters, callback);
});

global.exports('fetchScalarAsync', (query: string, parameters?: keyValue, callback?: CFXCallback): void => {
    server.execute(query, parameters, (result) => {
        callback((result && result[0]) ? (Object.values(result[0])[0] ?? null) : null);
    });
});

global.exports('fetchFirstAsync', (query: string, parameters?: keyValue, callback?: CFXCallback): void => {
    server.execute(query, parameters, (result) => {
        callback((result && result[0]) ? result[0] ?? [] : []);
    });
});

global.exports('insert', async (query: string, parameters?: keyValue): Promise<number> => {
    let res: number = null;
    let done: boolean = false;

    server.execute(query, parameters, (result) => {
        res = <number>(<OkPacket>result?.insertId ?? 0);
        done = true;
    });

    do { await wait(0); } while (done == false);

    return res;
});

global.exports('fetchAll', async (query: string, parameters?: keyValue): Promise<any> => {
    let res: any = null;
    let done: boolean = false;

    server.execute(query, parameters, (result) => {
        res = result;
        done = true;
    });

    do { await wait(0); } while (done == false);

    return res;
});

global.exports('fetchScalar', async (query: string, parameters?: keyValue): Promise<any> => {
    let res: any = null;
    let done: boolean = false;

    server.execute(query, parameters, (result) => {
        res = (result && result[0]) ? (Object.values(result[0])[0] ?? null) : null;
        done = true;
    });

    do { await wait(0); } while (done == false);

    return res;
});

global.exports('fetchFirst', async (query: string, parameters?: keyValue): Promise<any> => {
    let res: any = null;
    let done: boolean = false;

    server.execute(query, parameters, (result) => {
        res = (result && result[0]) ? result[0] ?? [] : [];
        done = true;
    });

    do { await wait(0); } while (done == false);

    return res;
});