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

app.use(express.json())

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database in car:', err);
        return;
    }
});

app.get('/', (req, res) => {
    const query = 'SELECT * FROM users'
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

app.get('/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE ID = ?'
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

app.put('/:id', (req, res) => {
    const { name, username, email, pays, adresse, telephone } = req.body
    const query = 'UPDATE users SET NAME = ?, USERNAME = ?, EMAIL = ?, PAYS = ?, ADRESSE = ?, TELEPHONE = ? WHERE ID = ?'
    connection.query(query, [name, username, email, pays, adresse, telephone, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to update' })
        }
        return res.status(200).json({ message: 'User updated' })
    })
})

module.exports = app