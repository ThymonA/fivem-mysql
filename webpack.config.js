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

const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    optimization: {
        minimize: false,
    },
    entry: './source/server.ts',
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'fivemsql.js',
        path: path.resolve(__dirname, 'build')
    }
}