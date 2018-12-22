const express = require('express');
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

app.put('/api/restaurants/:id', (req, res) => {
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

app.post('/api/restaurants/create', (req, res) => {
    let restaurantName;

    connection.query(`INSERT INTO restaurants(name) VALUES(${restaurantName})`, (err, results) => {
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