const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 8080;

const selectRestaurants = 'SELECT * FROM restaurants';

let connection;

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} 
else {
   connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "restaurantdb"
    });
}

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /api/restauarants')
});

app.get('/api/restaurants', (req, res) => {
    connection.query(selectRestaurants, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            // console.log(results);
            return res.json({
                data: results
            })
        }
    });
});

app.get('/api/restaurants/:id', (req, res) => {
    let tempId = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(Number.isInteger(req.params.id));
    console.log(Number.isInteger(tempId));

    connection.query(`UPDATE restaurants SET visited = true WHERE id = ${tempId}`, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.sendStatus(200);
        }
    });
});

app.post('/api/restaurants/create', bodyParser.urlencoded(), function(req, res) {
    let restaurantName = String(Object.keys(req.body));
    // let sRestName = JSON.stringify(req.body);
    // console.log(`Stingified restaurant name: ${sRestName}`);

    connection.query(`INSERT INTO restaurants (name) VALUES ('${restaurantName}')`, (err, results) => {
        if(err) {
            console.log(err);
            return res.send(err)
        }
        else {
            return res.sendStatus(200);
        }
    });
});

app.get('/api/restaurants/rate/:id', (req, res) => {
    let tempId = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(Number.isInteger(req.params.id));
    console.log(Number.isInteger(tempId));

    connection.query(`UPDATE restaurants SET visitAgain = false WHERE id = ${tempId}`, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.sendStatus(200);
        }
    });
});


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});