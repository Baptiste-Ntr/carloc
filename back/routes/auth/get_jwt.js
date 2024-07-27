const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    const token = req.cookies.jwt

    if(!token) {
        return res.sendStatus(401)
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            } else {
                return res.status(200).json({ user: user })
            }
        })
    }
})

module.exports = app;
