const mysql = require('mysql');
const config = require('./config.json');
const database = new mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    port: config.mysql.port,
    password: config.mysql.password,
    database: config.mysql.database
});

database.connect(function(err) {
    if(err) throw err;

    console.log('--> database connected');
});

module.exports = database;