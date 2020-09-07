var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'herlock',
    password: 'lake0227',
    database: 'opentutorials'
});

db.connect;

module.exports = db;