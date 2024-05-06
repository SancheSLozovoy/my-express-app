const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const db = require('./database');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Привет, мир!');
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Ошибка при получении пользователей:', err.message);
            res.status(500).send('Ошибка сервера');
        } else {
            res.status(200).json(result);
        }
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, userId, (err, result) => {
        if (err) {
            console.error('Ошибка при получении информации о пользователе:', err.message);
            res.status(500).send('Ошибка сервера');
        } else {
            if (result.length > 0) {
                const user = result[0];
                res.status(200).json(user);
            } else {
                res.status(404).send('Пользователь не найден');
            }
        }
    });
});

app.post('/register', (req, res) => {
    const { name, password } = req.body;
    const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
    db.query(sql, [name, password], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении нового пользователя:', err.message);
            res.status(500).send('Ошибка сервера');
        } else {
            console.log('Новый пользователь успешно добавлен в базу данных');
            res.status(200).send(`Пользователь ${name} успешно зарегистрирован!`);
        }
    });
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    db.query(sql, [login, password], (err, result) => {
        if (err) {
            console.error('Ошибка при проверке пользователя:', err.message);
            res.status(500).send('Ошибка сервера');
        } else {
            if (result.length > 0) {
                console.log('Пользователь авторизован:', login);
                res.status(200).send(`Пользователь ${login} успешно авторизован!`);
            } else {
                console.log('Неверные учетные данные');
                res.status(401).send('Неверные учетные данные');
            }
        }
    });
});

// server.js



app.post('/advertisements', (req, res) => {
    const { title, price, userId } = req.body;

    const sql = 'INSERT INTO advertisements (Title, Price, UserID) VALUES (?, ?, ?)';
    db.query(sql, [title, price, userId], (err, result) => {
        if (err) {
            console.error('Ошибка при добавлении нового объявления:', err.message);
            res.status(500).send('Ошибка сервера');
        } else {
            console.log('Новое объявление успешно добавлено в базу данных');
            res.status(200).send('Новое объявление успешно добавлено в базу данных');
        }
    });
});

app.delete('/advertisements/:id', (req, res) => {
    const adId = req.params.id;

    const sql = 'DELETE FROM advertisements WHERE AdID = ?';
    db.query(sql, adId, (err, result) => {
        if (err) {
            console.error('Ошибка при удалении объявления из базы данных:', err.message);
            res.status(500).send('Ошибка сервера');
        } else {
            console.log('Объявление успешно удалено из базы данных');
            res.status(200).send('Объявление успешно удалено из базы данных');
        }
    });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
