const createDB = require('./utils/createDB.js');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
    createDB();
})

app.use('/login', require('./routes/auth/login.js'));

app.use('/register', require('./routes/auth/register.js'));

app.use('/profile', authenticateToken, require('./routes/profile.js'))

app.use('/create_annonce', authenticateToken, require ('./routes/create_annonce.js'));

app.use('/cars', authenticateToken, require('./routes/car/cars.js'));

app.use('/get_cars', authenticateToken, require('./routes/car/get_cars.js'));

app.use('/get_jwt', require('./routes/get_jwt.js'));