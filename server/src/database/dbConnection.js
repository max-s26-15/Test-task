const mysql = require('mysql2');
require('dotenv').config({path: '../../.env'});

async function getConnection() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });

    return connection;
}

module.exports = getConnection;