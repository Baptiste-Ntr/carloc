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
    const query = 'SELECT * FROM annonces'
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

app.get('/:id', (req, res) => {
    const query = 'SELECT * FROM annonces WHERE ID = ?'
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to query' })
        }
        return res.status(200).json(result)
    })
})

app.post('/', (req, res) => {
    const { id_user, id_car, title, description, images_url } = req.body
    const query = 'INSERT INTO annonces (ID_USER, ID_CAR, TITLE, DESCRIPTION, CREATED_AT) VALUES (?, ?, ?, ?, ?)'
    connection.query(query, [id_user, id_car, title, description, images_url], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to insert' })
        }
        return res.status(200).json({ message: 'Annonce created' })
    })
})

app.put('/:id', (req, res) => {
    const { id_user, id_car, title, description, images_url } = req.body
    const query = 'UPDATE annonces SET ID_USER = ?, ID_CAR = ?, TITLE = ?, DESCRIPTION = ?, IMAGES_URL = ? WHERE ID = ?'
    connection.query(query, [id_user, id_car, title, description, images_url, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to update' })
        }
        return res.status(200).json({ message: 'Annonce updated' })
    })
})

app.delete('/:id', (req, res) => {
    const query = 'DELETE FROM annonces WHERE ID = ?'
    connection.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Internal error when trying to delete' })
        }
        return res.status(200).json({ message: 'Annonce deleted' })
    })
})

module.exports = app