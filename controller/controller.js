const model = require('../models/model');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.send('go to /api/restauarants')
});

router.get('/api/restaurants', (req, res) => {
    model.all(function(restaurantList) {
        res.json({
            data: restaurantList
        })
        
    })
});

router.get('/api/restaurants/:id', (req, res) => {
    let tempId = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(Number.isInteger(req.params.id));
    console.log(Number.isInteger(tempId));

    model.updateVisit(tempId);
    res.redirect("/api/restaurants");
});

router.get('/api/restaurants/rate/:id', (req, res) => {
    let tempId = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(Number.isInteger(req.params.id));
    console.log(Number.isInteger(tempId));

    model.updateRating(tempId);
    res.redirect("/api/restaurants");

});

router.post('/api/restaurants/create', bodyParser.urlencoded(), function(req, res) {
    let restaurantName = String(Object.keys(req.body));

    model.addRestaurant(restaurantName);
});

module.exports = router;