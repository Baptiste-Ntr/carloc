const createDB = require('./utils/createDB.js');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
    createDB();
})

app.use('/login', require('./auth/login.js'));

app.use('/register', require('./auth/register.js'));

app.use('/create_annonce', require ('./annonce/create_annonce.js'));