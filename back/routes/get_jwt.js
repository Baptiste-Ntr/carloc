const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const jwt = req.cookies.jwt

    if(jwt) {
        res.json({ jwt })
    } else {
        res.status(401).send('Unauthorized')
    }
})

module.exports = app;