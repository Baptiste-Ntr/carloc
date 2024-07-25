const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');

app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Create annonce')
})


//Route pour gérer la création d'annonce
app.post('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'carloc'
    })
    connection.connect();
    const {title, description, price, image_url } = req.body;
    
    //Inserer les données dans la base de données
    const query = 'INSERT INTO annonces (title, description, images_url, price) VALUES (?,?,?,?)';
    connection.query(query, [title, description, image_url, price], (err, results) => {
        if(err) {
            console.log('Error:', err)
            res.status(500).send('Error')
        } else {
            res.status(200).send('Success')
        }
    });
    connection.end()
});

module.exports = app;
