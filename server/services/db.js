const mysql = require("mysql");
const keys = require("../../config/keys");;

var pool = mysql.createPool({
    host: keys.databaseHost,
    user: keys.databaseUser,
    password: keys.databasePassword,
    database: keys.database,
    multipleStatements: true
});

module.exports = pool;