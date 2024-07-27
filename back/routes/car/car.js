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

app.get('/', (req, res) => {
    const query = 'SELECT * FROM cars'
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

app.get('/:id', (req, res) => {
    const query = 'SELECT * FROM cars WHERE ID = ?'
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

app.post('/', (req, res) => {
    const { idUser, title, power, fuel, price, kms, date, createdAt } = req.body
    const query = 'INSERT INTO cars (ID_USER, TITLE, POWER, FUEL, PRICE, KMS, DATE, CREATED_AT) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    connection.query(query, [idUser, title, power, fuel, price, kms, date, createdAt], (err, result) => {
        if (err) {
            return res.status(500).json({ message: `Internal error when trying to insert : ${err}`})
        }
        return res.status(200).json({ message: 'Car created' })
    })
})

app.put('/:id', (req, res) => {
    const { idUser, title, power, fuel, price, kms, date, updatedAt } = req.body
    const query = 'UPDATE cars SET ID_USER = ?, TITLE = ?, POWER = ?, FUEL = ?, PRICE = ?, KMS = ?, DATE = ?, UPDATED_AT = ? WHERE ID = ?'
    connection.query(query, [idUser, title, power, fuel, price, kms, date, updatedAt, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to update' })
        }
        return res.status(200).json({ message: 'Car updated' })
    })
})

app.delete('/:id', (req, res) => {
    const query = 'DELETE FROM cars WHERE ID = ?'
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to delete' })
        }
        return res.status(200).json({ message: 'Car deleted' })
    })
})


module.exports = app



