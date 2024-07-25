const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'carloc'
    })
    connection.connect()

    const {userId} = req.body;

    const query = 'SELECT * FROM cars WHERE id_user = ?';

    connection.query(query, [userId], (err, results) => {
        if(err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            res.status(200).json(results)
        }
    });
})

module.exports = app;
