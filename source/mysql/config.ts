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

import { parse } from 'qs';
import { parse as ConnectionString } from 'pg-connection-string';
import { ConnectionOptions } from 'mysql2';

function getConnectionFromString(rawConnectionString: string): ConnectionOptions {
    let connection = {} as ConnectionOptions;

    if (/(?:database|initial\scatalog)=(?:(.*?);|(.*))/gi.test(rawConnectionString)) {
        const conf = parse(rawConnectionString, {delimiter: /[;]/ });
        const host = conf.host || conf.server || conf.data || conf.source || conf.addr || conf.address || null;
        const user = conf.user || conf.userid || conf.username || conf.uid || null;
        const password = conf.password || conf.pwd || conf.pass || null;
        const port = typeof conf.port == 'string' ? parseInt(conf.port) : typeof conf.port == 'number' ? conf.port : null;
        const database = conf.database || null;

        connection = {
            host: typeof host == 'string' ? host : null,
            user: typeof user == 'string' ? user : null,
            password: typeof password == 'string' ? password : null,
            port: typeof port == 'number' && (port > 0 && port < 65535) ? port : null,
            database: typeof database == 'string' ? database : null
        }
    } else {
        const connectionString = ConnectionString(rawConnectionString);

        connection = {
            host: typeof connectionString.host == 'string' ? connectionString.host : null,
            user: typeof connectionString.user == 'string' ? connectionString.user : null,
            password: typeof connectionString.password == 'string' ? connectionString.password : null,
            port: typeof connectionString.port == 'number' && (connectionString.port > 0 && connectionString.port < 65535) ? connectionString.port : null,
            database: typeof connectionString.database == 'string' ? connectionString.database : null
        }
    }

    return connection;
}

export {
    getConnectionFromString
};