const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', (req, res, next) => {
    res.send('Create annonce')
})

//stockage image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const img = multer({ storage: storage });

//connection à la bdd
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'carloc'
})


//Route pour gérer la création d'annonce
app.post('/', img.array('images', 10), (req, res, next) => {
    connection.connect();
    const {title, description, vehicule, puissance, carburant, localisation, boite_vitesse, price } = req.body;
    const imageUrls = req.files.map( file => '/img/${file.filename}');
    
    //Inserer les données dans la base de données
    const query = 'INSERT INTO annonce (title, description, images_URL, vehicule, puissance, carburant, localisation, boite_vitesse, price) VALUES (?,?,?,?,?,?,?,?,?)';
    connection.query(query, [title, description, JSON.stringify(imageUrls), vehicule, puissance, carburant, localisation, boite_vitesse, price], (err, results) => {
        if(err) throw err;
        res.json({ message: 'Annonce créée avec succès', annonceID: results.insertId });
    });
    connection.end()
});

module.exports = app;
