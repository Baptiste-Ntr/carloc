const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'carloc'
})

app.post('/', (req, res) => {
    
    connection.connect()

    const {userId, title, power, fuel, transmission, price, kms, date} = req.body;

    const query = 'INSERT INTO cars (title, power, fuel, transmission, price, kms, date, id_user) VALUES (?,?,?,?,?,?,?,?)';

    connection.query(query, [title, power, fuel, transmission, price, kms, date, userId], (err, results) => {
        if(err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            res.status(200).send('Success')
        }
    });

    connection.end()
})

app.delete('/', (req, res) => {
    connection.connect()

    const {carId} = req.body;

    console.log(carId)

    const query = 'DELETE FROM cars WHERE id = ?';
    connection.query(query, [carId], (err, results) => {
        if(err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            console.log('Car deleted')
            res.status(200).send('Success')
        }
    });

    connection.end()
})

app.put('/', (req, res) => {
    connection.connect()

    const {carId, title, power, fuel, transmission, price, kms, date} = req.body;

    const query = 'UPDATE cars SET title = ?, power = ?, fuel = ?, transmission = ?, price = ?, kms = ?, date = ? WHERE id = ?';
    connection.query(query, [title, power, fuel, transmission, price, kms, date, carId], (err, results) => {
        if(err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            console.log('Car updated')
            res.status(200).send('Success')
        }
    });
})

module.exports = app;
