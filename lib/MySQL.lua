---
---
--- USE THIS FILE IF YOU WANT TO REPLACE `fivem-mysql-async` by `brouznouf` with `fivem-mysql` by `ThymonA`.
--- THIS FILE HAS THE SAME STRUCTURE AS https://github.com/brouznouf/fivem-mysql-async/blob/master/lib/MySQL.lua
--- MAKES IT EASER TO TRANSFORM `fivem-mysql-async` to `fivem-mysql`
---
--- REPLACE `@mysql-async/lib/MySQL.lua` with `@fivem-mysql/lib/MySQL.lua` YOUR GOOD TO GO.
---
--- MISSING IMPLEMENTATIONS:
--- MySQL.Sync.store
--- MySQL.Sync.transaction
--- MySQL.Async.store
--- MySQL.Async.transaction
---

--- Cached globals
local assert = assert
local type = type
local rawget = rawget
local next = next
local setmetatable = setmetatable
local GetResourceState = GetResourceState
local GetCurrentResourceName = GetCurrentResourceName
local CreateThread = Citizen.CreateThread
local Wait = Citizen.Wait

--- Variables
local resource_name = GetCurrentResourceName()

--- MySQL global variable
local MySQL = setmetatable({ Async = {}, Sync = {} }, {
    __call = function(self, query, params)
        return self.Sync.execute(query, params)
    end
})

---
-- Returns the real type of given `input`
--
-- @param input any
--
-- @return string Type of given input like `type` but better :D
--
local function typeof(input)
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

---
-- Make sure that the given parameters are save to execute
--
-- @param params any
--
-- @return table Parameters or empty parameters
--
local function safeParameters(params)
    if (typeof(params) == 'nil') then params = {} end
    if (typeof(params) ~= 'table') then params = {} end
    if (next(params) == nil) then params = {} end

    return params
end

---
-- Execute a query with no result required, sync version
--
-- @param query
-- @param params
--
-- @return int Number of rows updated
--
MySQL.Sync.execute = function(query, params)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')

    local res, finished = 0, false

    MySQL.Async.execute(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end
---
-- Execute a query and fetch all results in an sync way
--
-- @param query
-- @param params
--
-- @return table Query results
--
MySQL.Sync.fetchAll = function(query, params)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')

    local res, finished = 0, false

    MySQL.Async.fetchAll(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

---
-- Execute a query and fetch the first column of the first row, sync version
-- Useful for count function by example
--
-- @param query
-- @param params
--
-- @return mixed Value of the first column in the first row
--
MySQL.Sync.fetchScalar = function(query, params)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')

    local res, finished = 0, false

    MySQL.Async.fetchScalar(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

---
-- Execute a query and retrieve the last id insert, sync version
--
-- @param query
-- @param params
--
-- @return mixed Value of the last insert id
--
MySQL.Sync.insert = function(query, params)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')

    local res, finished = 0, false

    MySQL.Async.insert(query, params, function(result)
        res = result
        finished = true
    end)

    repeat Citizen.Wait(0) until finished == true

    return res
end

---
-- Stores a query for later execution
--
-- @param query
--
MySQL.Sync.store = function(query)
    error('`MySQL.Sync.store` hasn\'t been implemented, please replace this function.')
end

---
-- Execute a List of querys and returns bool true when all are executed successfully
--
-- @param querys
-- @param params
--
-- @return bool if the transaction was successful
--
MySQL.Sync.transaction = function(querys, params)
    error('`MySQL.Sync.transaction` hasn\'t been implemented, please replace this function.')
end

---
-- Execute a query with no result required, async version
--
-- @param query
-- @param params
-- @param func(int)
--
MySQL.Async.execute = function(query, params, callback)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')
    assert(typeof(callback) == 'function', 'Callback must be a function')

    exports['fivem-mysql']:executeAsync(query, params, callback, resource_name)
end

---
-- Execute a query and fetch all results in an async way
--
-- @param query
-- @param params
-- @param func(table)
--
MySQL.Async.fetchAll = function(query, params, callback)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')
    assert(typeof(callback) == 'function', 'Callback must be a function')

    exports['fivem-mysql']:fetchAllAsync(query, params, callback, resource_name)
end

---
-- Execute a query and fetch the first column of the first row, async version
-- Useful for count function by example
--
-- @param query
-- @param params
-- @param func(mixed)
--
MySQL.Async.fetchScalar = function(query, params, callback)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')
    assert(typeof(callback) == 'function', 'Callback must be a function')

    exports['fivem-mysql']:fetchScalarAsync(query, params, callback, resource_name)
end

---
-- Execute a query and retrieve the last id insert, async version
--
-- @param query
-- @param params
-- @param func(string)
--
MySQL.Async.insert = function(query, params, callback)
    params = safeParameters(params or {})

    assert(typeof(query) == 'string', 'SQL query must be a string')
    assert(typeof(params) == 'table', 'Parameters must be a table')
    assert(typeof(callback) == 'function', 'Callback must be a function')

    exports['fivem-mysql']:insertAsync(query, params, callback, resource_name)
end

---
-- Stores a query for later execution
--
-- @param query
-- @param func(number)
--
MySQL.Async.store = function(query, func)
    error('`MySQL.Async.store` hasn\'t been implemented, please replace this function.')
end

---
-- Execute a List of querys and returns bool true when all are executed successfully
--
-- @param querys
-- @param params
-- @param func(bool)
--
MySQL.Async.transaction = function(querys, params, func)
    error('`MySQL.Async.transaction` hasn\'t been implemented, please replace this function.')
end

function MySQL.ready(callback)
    CreateThread(function ()
        local cb = callback or function() end

        assert(typeof(cb) == 'function', 'Callback must be a function')

        while GetResourceState('fivem-mysql') ~= 'started' do Wait(0) end
        while not exports['fivem-mysql']:isReady() do Citizen.Wait(0) end

        cb()
    end)
end