const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Register route')
});

app.post('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'carloc'
    })

    console.log('req body',req.body)

    // if (!req.body.name || !req.body.username || !req.body.password || !req.body.pays || !req.body.adresse || !req.body.telephone || !req.body.email || !req.body.avatar_url) {
    //     res.status(400).send('Missing parameters')
    //     return
    // }

    // if (req.body.password.length < 8) {
    //     res.status(400).send('Password too short')
    //     return
    // }

    // if (!req.body.email.includes('@')) {
    //     res.status(400).send('Invalid email')
    //     return
    // }

    // if (req.body.telephone.length !== 10) {
    //     res.status(400).send('Invalid phone number')
    //     return
    // }

    // if (req.body.avatar_url.length === 0) {
    //     res.status(400).send('Invalid avatar URL')
    //     return
    // }

    // if (req.body.pays.length === 0) {
    //     res.status(400).send('Invalid country')
    //     return
    // }

    // if (req.body.adresse.length === 0) {
    //     res.status(400).send('Invalid address')
    //     return
    // }

    // if (req.body.username.length === 0) {
    //     res.status(400).send('Invalid username')
    //     return
    // }

    // if (req.body.name.length === 0) {
    //     res.status(400).send('Invalid name')
    //     return
    // }

    // if (req.body.password.length === 0) {
    //     res.status(400).send('Invalid password')
    //     return
    // }

    // if (req.body.password !== req.body.password_confirm) {
    //     res.status(400).send('Passwords do not match')
    //     return
    // }

    // if (req.body.email !== req.body.email_confirm) {
    //     res.status(400).send('Emails do not match')
    //     return
    // }

    // if (req.body.email.length === 0) {
    //     res.status(400).send('Invalid email')
    //     return
    // }

    req.body.password = bcrypt.hashSync(req.body.password, 10)

    console.log(req.body.password)
    
    connection.connect()
    
    const query = `INSERT INTO users (NAME, USERNAME, PASSWORD, PAYS, ADRESSE, TELEPHONE, EMAIL, AVATAR_URL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    connection.query(query, [req.body.name, req.body.username, req.body.password, req.body.pays, req.body.adresse, req.body.telephone, req.body.email, req.body.avatar_url], (err, result) => {
        if (err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            res.status(200).send('User created')
        }
    })
})


module.exports = app