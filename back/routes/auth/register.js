const express = require('express')
const mysql = require("mysql")
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()

app.use(express.json())

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

app.post('/', (req, res) => {
    const {name, username, password, email, pays, adresse, telephone} = req.body

    const query = 'SELECT * FROM users WHERE username = ? OR email = ?'
    connection.createQuery(query, [username, email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        if (result.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal error when trying to hash password' })
                }
                const query = 'INSERT INTO users (NAME, USERNAME, PASSWORD, PAYS, ADRESSE, TELEPHONE, EMAIL) VALUES (?, ?, ?, ?, ?, ?, ?)'
                connection.query(query, [name, username, hash, pays, adresse, telephone, email], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Internal error when trying to insert user' })
                    }
                    return res.status(200).json({ message: 'User created' })
                })
            })
        }
    })
})

module.exports = app