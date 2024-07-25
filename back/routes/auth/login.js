const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
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

    const pswHash = bcrypt.hashSync(req.body.password, 10)

    connection.connect()
    const query = 'SELECT * FROM users WHERE EMAIL = ?';
    connection.query(query, [req.body.email], (err, results) => {
        if (err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            bcrypt.compare(req.body.password, pswHash, (err, bcyrptResult) => {
                if (err) {
                    console.log('Error:', err)
                    res.status(500).send('Error')
                } else {
                    if (bcyrptResult) {
                        console.log(results)
                        const user = {id: results[0].ID}
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
                        res.cookie('jwt', accessToken, {httpOnly: true, secure: true, sameSite: 'none'})
                        res.status(200).json({accessToken, user})
                    } else {
                        res.status(401).send('Invalid credentials')
                    }
                }
            })
        }
    })
})

module.exports = app;
