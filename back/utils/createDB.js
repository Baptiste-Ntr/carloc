const mysql = require('mysql');

const createDB = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
    })

    try {
        connection.connect()
        connection.query('CREATE DATABASE IF NOT EXISTS carloc', (err, result) => {
            if (err) {
                console.log('Error creating DB:', err)
            } else {
                connection.query('USE carloc' )
                connection.query('CREATE TABLE IF NOT EXISTS users (ID int NOT NULL AUTO_INCREMENT, NAME varchar(255), USERNAME varchar(255), PASSWORD varchar(255), PAYS varchar(255), ADRESSE varchar(255), TELEPHONE varchar(255), EMAIL varchar(255), AVATAR_URL varchar(255), PRIMARY KEY (ID))', (err, result) => {
                    if (err) {
                        console.log('Error creating users table:', err)
                    } else {
                        console.log('Users table created')
                    }
                })
                connection.query('CREATE TABLE IF NOT EXISTS annonces (ID int NOT NULL AUTO_INCREMENT, ID_USER int, TITLE varchar(255), DESCRIPTION varchar(255), IMAGES_URL varchar(255), VEHICULE varchar(255), PUISSANCE float, CARBURANT varchar(255), LOCALISATION varchar(255), BOITE_VITESSE varchar(255), PRICE float, CREATED_AT datetime, UPDATED_AT datetime, PRIMARY KEY (ID), FOREIGN KEY (ID_USER) REFERENCES users(ID))', (err, result) => {
                    if (err) {
                        console.log('Error creating annonces table:', err)
                    } else {
                        console.log('Annonces table created')
                    }
                })
                connection.query('CREATE TABLE IF NOT EXISTS contrats (ID int NOT NULL AUTO_INCREMENT, ID_USER int, ID_ANNONCE int, DEBUT_CONTRAT datetime, FIN_CONTRAT datetime, PRIMARY KEY (ID), FOREIGN KEY (ID_USER) REFERENCES users(ID), FOREIGN KEY (ID_ANNONCE) REFERENCES annonces(ID))', (err, result) => {
                    if (err) {
                        console.log('Error creating contrats table:', err)
                    } else {
                        console.log('Contrats table created')
                    }
                })
                connection.query('CREATE TABLE IF NOT EXISTS reviews (ID int NOT NULL AUTO_INCREMENT, ID_USER int, ID_ANNONCE int, NOTE float, COMMENT varchar(255), CREATED_AT datetime, UPDATED_AT datetime, PRIMARY KEY (ID), FOREIGN KEY (ID_USER) REFERENCES users(ID), FOREIGN KEY (ID_ANNONCE) REFERENCES annonces(ID))', (err, result) => {
                    if (err) {
                        console.log('Error creating reviews table:', err)
                    } else {
                        console.log('Reviews table created')
                    }
                })
                console.log('DB created')
            }
        })
    } catch (err) {
        console.log('Error connecting to DB:', err)
    }
}

module.exports = createDB;