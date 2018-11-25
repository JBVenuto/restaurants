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
    res.send('go to /restauarants')
});
app.get('/api/restaurants', (req, res) => {
    connection.query(selectRestaurants, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});