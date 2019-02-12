const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const PORT = 8080;

const selectRestaurants = 'SELECT * FROM restaurants';

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurantdb"
});

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
    console.log("\/\/\/ TEST BELOW \/\/\/")
    console.log(req);
    console.log(restaurantName);
    // let sRestName = JSON.stringify(req.body);
    // console.log(`Stingified restaurant name: ${sRestName}`);
    console.log("anything?");

    connection.query(`INSERT INTO restaurants (name) VALUES ('${restaurantName}')`, (err, results) => {
        if(err) {
            console.log("womp womp");
            console.log(err);
            return res.send(err)
        }
        else {
            console.log("great job");
            return res.sendStatus(200);
        }
    });
});


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});