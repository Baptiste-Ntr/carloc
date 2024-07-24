const express = require('express');
const app = express();
const mysql = require('mysql');


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
    connection.query(`SELECT * FROM users WHERE USERNAME = '${req.body.username}' AND PASSWORD = '${req.body.password}'`, (err, result) => {
        if (err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            if (result.length === 0) {
                res.status(401).send('Unauthorized')
            } else {
                res.status(200).send('Authorized')
            }
        }
    })
    connection.end()
})

module.exports = app;
