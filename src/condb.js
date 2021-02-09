"use strict";

var mysql = require("mysql");

var config;
config = {
    connect: mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "ck-think",
        connectionLimit: 10,
    })

}


module.exports = config