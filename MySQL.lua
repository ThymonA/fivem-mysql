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
-- ┃ al

local assert = assert
local type = type
local rawget = rawget
local next = next
local setmetatable = setmetatable
local GetResourceState = GetResourceState
local GetCurrentResourceName = GetCurrentResourceName
local CreateThread = Citizen.CreateThread
local Wait = Citizen.Wait
local mysql = setmetatable({
    resource_name = 'fivem-mysql',
    current_resource_name = GetCurrentResourceName()
}, {})

function mysql:typeof(input)
    if (input == nil) then
        return 'nil';
    end

    local t = type(input);

    if (t ~= 'table') then
        return t;
    end

    if (rawget(input, '__cfx_functionReference') ~= nil or
        rawget(input, '__cfx_async_retval') ~= nil) then
        return 'function';
    end

    if (rawget(input, '__cfx_functionSource') ~= nil) then
        return 'number';
    end

    return t;
end

function mysql:safeParams(params)
    if (self:typeof(params) == 'nil') then params = {} end
    if (self:typeof(params) ~= 'table') then params = {} end
    if (next(params) == nil) then params = {} end

    return params
end

function mysql:execute(query, params)
    params = params or {}

    local res, finished = nil, false

    self:executeAsync(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

function mysql:insert(query, params)
    params = params or {}

    local res, finished = nil, false

    self:insertAsync(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

function mysql:fetchAll(query, params)
    params = params or {}

    local res, finished = nil, false

    self:fetchAllAsync(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

function mysql:fetchScalar(query, params)
    params = params or {}

    local res, finished = nil, false

    self:fetchScalarAsync(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

function mysql:fetchFirst(query, params)
    params = params or {}

    local res, finished = nil, false

    self:fetchFirstAsync(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

function mysql:executeAsync(query, params, callback)
    params = params or {}

    assert(self:typeof(query) == 'string', 'SQL query must be a string')
    assert(self:typeof(params) == 'table', 'Parameters must be a table')
    assert(self:typeof(callback) == 'function', 'Callback must be a function')

    params = self:safeParams(params)

    exports[self.resource_name]:executeAsync(query, params, callback, self.current_resource_name)
end

function mysql:insertAsync(query, params, callback)
    params = params or {}

    assert(self:typeof(query) == 'string', 'SQL query must be a string')
    assert(self:typeof(params) == 'table', 'Parameters must be a table')
    assert(self:typeof(callback) == 'function', 'Callback must be a function')

    params = self:safeParams(params)

    exports[self.resource_name]:insertAsync(query, params, callback, self.current_resource_name)
end

function mysql:fetchAllAsync(query, params, callback)
    params = params or {}

    assert(self:typeof(query) == 'string', 'SQL query must be a string')
    assert(self:typeof(params) == 'table', 'Parameters must be a table')
    assert(self:typeof(callback) == 'function', 'Callback must be a function')

    params = self:safeParams(params)

    exports[self.resource_name]:fetchAllAsync(query, params, callback, self.current_resource_name)
end

function mysql:fetchScalarAsync(query, params, callback)
    params = params or {}

    assert(self:typeof(query) == 'string', 'SQL query must be a string')
    assert(self:typeof(params) == 'table', 'Parameters must be a table')
    assert(self:typeof(callback) == 'function', 'Callback must be a function')

    params = self:safeParams(params)

    exports[self.resource_name]:fetchScalarAsync(query, params, callback, self.current_resource_name)
end

function mysql:fetchFirstAsync(query, params, callback)
    params = params or {}

    assert(self:typeof(query) == 'string', 'SQL query must be a string')
    assert(self:typeof(params) == 'table', 'Parameters must be a table')
    assert(self:typeof(callback) == 'function', 'Callback must be a function')

    params = self:safeParams(params)

    exports[self.resource_name]:fetchFirstAsync(query, params, callback, self.current_resource_name)
end

function mysql:ready(callback)
    CreateThread(function()
        local cb = callback or function() end

        assert(self:typeof(cb) == 'function', 'Callback must be a function')

        while GetResourceState(self.resource_name) ~= 'started' do Wait(0) end
        while not exports[self.resource_name]:isReady() do Wait(0) end

        cb()
    end)
end

--- Register `mysql` as global variable
_G.mysql = mysql
_ENV.mysql = mysql