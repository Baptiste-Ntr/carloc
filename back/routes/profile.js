const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());

app.post('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'carloc'
    })

    connection.connect()
    connection.query(`SELECT NAME, USERNAME, PAYS, ADRESSE, TELEPHONE, EMAIL FROM users WHERE EMAIL = '${req.body.email}'`, (err, result) => {
        if (err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            res.status(200).json({result})
        }
    })
    connection.end()
})

app.put('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'carloc'
    })
    connection.connect()
    connection.query(`UPDATE users SET NAME = '${req.body.name}', USERNAME = '${req.body.username}', PAYS = '${req.body.pays}', ADRESSE = '${req.body.adresse}', TELEPHONE = '${req.body.telephone}' WHERE EMAIL = '${req.body.email}'`, (err, result) => {
        if (err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            res.status(200).send('Success')
        }
    })
})

module.exports = app;
