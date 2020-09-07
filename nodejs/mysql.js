var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'herlock',
    password: 'lake0227',
    database: 'opentutorials'
});

connection.connect();

connection.query('SELECT * from topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();