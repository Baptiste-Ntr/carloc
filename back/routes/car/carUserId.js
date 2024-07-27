const express = require('express')
const mysql = require('mysql')
require('dotenv').config()
const app = express()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database in car:', err);
        return;
    }
});

app.use(express.json())


app.get('/:id', (req, res) => {
    const query = 'SELECT * FROM cars WHERE ID_USER = ?'
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

module.exports = app



