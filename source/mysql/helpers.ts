/**
𝗙𝗶𝘃𝗲𝗠 𝗠𝘆𝗦𝗤𝗟 - 𝗠𝘆𝗦𝗤𝗟 𝗹𝗶𝗯𝗿𝗮𝗿𝘆 𝗳𝗼𝗿 𝗙𝗶𝘃𝗲𝗠
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
➤ License:      https://choosealicense.com/licenses/gpl-3.0/
➤ GitHub:       https://github.com/ThymonA/fivem-mysql/
➤ Author:       Thymon Arens <ThymonA>
➤ Name:         FiveM MySQL
➤ Version:      1.0.1
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
import { escape } from 'sqlstring';

function fixQuery(query: string) {
    if (typeof query != 'string') { return ''; }

    return query.replace(/[@]/g, ':');
}

function fixParameters(params: { [key: string]: any }, stringifyObjects?: boolean, timezone?: string) {
    const result = { } as { [key: string]: string };
    const keys = Object.keys(params);

    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = params[key];
        const newKey = key.replace(/[@|:]/g, '');
        
        result[newKey] = escape(value, stringifyObjects, timezone);
        
        if (result[newKey].startsWith("'")) { result[newKey] = result[newKey].substr(1); }
        if (result[newKey].endsWith("'")) { result[newKey] = result[newKey].substr(0, result[newKey].length - 1); }
    }

    return result;
}

function warnIfNeeded(time: [number, number], logger: Tracer.Logger, sql: string, resource: string, interval: number) {
    const queryTime = time[0] * 1e3 + time[1] * 1e-6;

    if (interval <= 0 || interval > queryTime) { return; }

    logger.warn(`Resource '${resource}' executed an query that took ${queryTime.toFixed()}ms to execute\n> ^4Query: ^7${sql}\n> ^4Execution time: ^7${queryTime.toFixed()}ms`);
}

export {
    fixQuery,
    fixParameters,
    warnIfNeeded
}