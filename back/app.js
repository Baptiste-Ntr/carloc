const createDB = require('./utils/createDB.js');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions), cookieParser());

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt

    if(!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403)
        }
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

app.use('/get_jwt', require('./routes/auth/get_jwt'))

app.use('/login', require('./routes/auth/login'))

app.use('/register', require('./routes/auth/register'))

app.use('/annonces', authenticateToken, require('./routes/annonces/annonce'))

app.use('/cars', authenticateToken, require('./routes/car/car'))

app.use('/cars_user', authenticateToken, require('./routes/car/carUserId'))

