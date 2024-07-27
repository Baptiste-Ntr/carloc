const express = require('express')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
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

app.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, result) => {
        if(err) {
            return res.status(500).json({ message: 'Internal error when trying to query' });
        }
        if(result.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        } else {
            const user = result[0];
            // console.log(user);
            bcrypt.compare(password, user.PASSWORD, (err, result) => {
                if(err) {
                    return res.status(500).json({ message: 'Internal error when trying to compare passwords' });
                }
                if(result) {
                    const token = jwt.sign({id: user.ID}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'})
                    res.cookie('jwt', token, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: process.env.NODE_ENV === 'production',
                        expires: new Date(Date.now() + 900000)
                    })
                    return res.status(200).json({ message: 'Logged in' });
                } else {
                    return res.status(401).json({ message: 'Wrong password' });
                }
            });
        }
    })

    
})

module.exports = app