const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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

    const pswHash = bcrypt.hashSync(req.body.password, 10)


    connection.connect()
    connection.query(`SELECT * FROM users WHERE EMAIL = '${req.body.email}'`, (err, result) => {
        if (err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            bcrypt.compare(req.body.password, pswHash, (err, result) => {
                if (err) {
                    console.log('Error:', err)
                    res.status(500).send('Error')
                } else {
                    if (result) {
                        res.status(200).send('Success')
                    } else {
                        res.status(401).send('Invalid credentials')
                    }
                }
            })
        }
    })
})

module.exports = app;
