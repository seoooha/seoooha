const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'mooo4030',
    connectionLimit: 10,
    multipleStatements: true,
    typeCast: function (field, next) {
        if (field.type == 'VAR_STRING') {
            return field.string();
        }
        return next();
    }
})

const data = pool.query('set names utf8;')

module.exports = pool