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

import { Tracer } from 'tracer';

const resource_name = GetCurrentResourceName();

function GetLoggerConfig(): Tracer.LoggerConfig {
    return {
        format: [
            `^7[^4${resource_name}^7][^7{{title}}^7] ^7{{message}}^7`,
            {
                warn: `^7[^4${resource_name}^7][^3{{title}}^7] ^3{{message}}^7`,
                error: `^7[^4${resource_name}^7][^1{{title}}^7] ^1{{message}}^7`,
                fatal: `^7[^4${resource_name}^7][^1{{title}}^7] ^1{{message}}^7`
            }
        ],
        level: GetConvar('mysql_level', 'warn'),
        inspectOpt: {
            showHidden: false,
            depth: 0
        },
        rootDir: GetResourcePath(GetCurrentResourceName())
    }
}

function GetSlowQueryWarning(): number {
    const rawInterval = GetConvar('mysql_slow_query_warning', '500') || '500';
    const interval = parseInt(rawInterval);

    return interval > 0 ? interval : -1;
}

export {
    GetLoggerConfig,
    GetSlowQueryWarning
}