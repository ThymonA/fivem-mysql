-- 𝗙𝗶𝘃𝗲𝗠 𝗠𝘆𝗦𝗤𝗟 - 𝗠𝘆𝗦𝗤𝗟 𝗹𝗶𝗯𝗿𝗮𝗿𝘆 𝗳𝗼𝗿 𝗙𝗶𝘃𝗲𝗠
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- ➤ License:      https://choosealicense.com/licenses/gpl-3.0/
-- ➤ GitHub:       https://github.com/ThymonA/fivem-mysql/
-- ➤ Author:       Thymon Arens <ThymonA>
-- ➤ Name:         FiveM MySQL
-- ➤ Version:      1.0.2
-- ➤ Description:  MySQL library made for FiveM
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 𝗚𝗡𝗨 𝗚𝗲𝗻𝗲𝗿𝗮𝗹 𝗣𝘂𝗯𝗹𝗶𝗰 𝗟𝗶𝗰𝗲𝗻𝘀𝗲 𝘃𝟯.𝟬
-- ┳
-- ┃ Copyright (C) 2020 Thymon Arens <ThymonA>
-- ┃
-- ┃ This program is free software: you can redistribute it and/or modify
-- ┃ it under the terms of the GNU General Public License as published by
-- ┃ the Free Software Foundation, either version 3 of the License, or
-- ┃ (at your option) any later version.
-- ┃
-- ┃ This program is distributed in the hope that it will be useful,
-- ┃ but WITHOUT ANY WARRANTY; without even the implied warranty of
-- ┃ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
-- ┃ GNU General Public License for more details.
-- ┃
-- ┃ You should have received a copy of the GNU General Public License
-- ┃ along with this program.  If not, see <https://www.gnu.org/licenses/>.
-- ┻

-- ┳
-- ┃ 𝗙𝗫 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻
-- ┃ Information required to run this resource
-- ┻
fx_version      'cerulean'
game            'gta5'

-- ┳
-- ┃ 𝗣𝗿𝗼𝗷𝗲𝗰𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻
-- ┃ Information about the project
-- ┻
name            'FiveM-MySQL'
version         '1.0.2'
description     'MySQL library made for FiveM'
url             'https://github.com/ThymonA/fivem-mysql/'

-- ┳
-- ┃ 𝗔𝘂𝘁𝗵𝗼𝗿 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻
-- ┃ Information about the author of this project
-- ┻
author          'Thymon Arens'
contact         'contact@arens.io'
discord         'Tigo#9999'
github          'ThymonA'

-- ┳
-- ┃ 𝗙𝗶𝗹𝗲 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻
-- ┃ File needs to be loaded and which order
-- ┻
server_scripts {
    'build/fivemsql.js'
}