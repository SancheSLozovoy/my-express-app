const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '65843asdf',
    database: 'usersdb'
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка при подключении к базе данных MySQL:', err.message);
    } else {
        console.log('Подключение к базе данных MySQL успешно');
    }
});

module.exports = db;
