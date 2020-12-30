# FiveM MySQL - MySQL library for FiveM
[![N|CoreV](https://i.imgur.com/wA7DmUS.png)](https://github.com/ThymonA/fivem-mysql)
[![Issues](https://img.shields.io/github/issues/ThymonA/fivem-mysql.svg?style=for-the-badge)](https://github.com/ThymonA/fivem-mysql/issues)
[![License](https://img.shields.io/github/license/ThymonA/fivem-mysql.svg?style=for-the-badge)](https://github.com/ThymonA/fivem-mysql/blob/master/LICENSE)
[![Forks](https://img.shields.io/github/forks/ThymonA/fivem-mysql.svg?style=for-the-badge)](https://github.com/ThymonA/fivem-mysql)
[![Stars](https://img.shields.io/github/stars/ThymonA/fivem-mysql.svg?style=for-the-badge)](https://github.com/ThymonA/fivem-mysql)

This mysql-async Library for FiveM intends to provide function to connect to a MySQL in a Sync and Async way. This resource is inspired by [`fivem-mysql-async`](https://github.com/brouznouf/fivem-mysql-async) and written by [ThymonA](https://github.com/ThymonA/)

### **Example**
If you want to know how this resource works? check the [`example.lua`](https://github.com/ThymonA/fivem-mysql/blob/master/example.lua) file inside this resource.

### **Config the `server.cfg`**
**Config** | **Description** | **Default**
:----------|:----------------|:----------------
`mysql_connection_string` | MySQL connection string, there are two variants possible: Check **`Connections strings`** under this table. | `mysql://root@localhost/fivem`
`mysql_level` | Warn level used to print message in console, there are couble of options like: `info`, `debug`, `warn`, `error` or `fatal` | `warn`
`mysql_slow_query_warning` | When an query takes longer than the defined number, print an query warn message in console to let the server know that the executed query is slow | `500` (ms)

#### **Connections strings:**
**Variants:**
* `mysql://root:pass1234@localhost/fivem`
* `server=localhost;userid=root;password=pass1234;database=fivem`

### **Issues**
Make sure you provide all information possible when reporting an issue.

### **Changelog**
For a detailed changelog either check the commits or read [`https://github.com/ThymonA/fivem-mysql/releases`](https://github.com/ThymonA/fivem-mysql/releases)

### **Features**

* Async / Sync.
* It uses the [node-mysql2](https://github.com/sidorares/node-mysql2) library to provide a connection to your mysql server and is faster than the [mysql](https://github.com/mysqljs/mysql) library.