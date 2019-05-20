const model = require('../models/model');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.send('go to /api/restauarants')
});

router.get('/api/restaurants', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*')
    model.all(function(restaurantList) {
        res.json({
            data: restaurantList
        })
        // res.render({
        //     data: JSON.stringify(restaurantList)
        // })
    })

    // let restaurantList = res.json({
    //     data: model.all()
    // }); 
    // let restaurantList = model.all();
    // console.log('req:', req);
    // console.log('res:', res);

    // console.log(`typeof restaurant list: ${typeof restaurantList}`);
    // console.log(`controller restaurant list: ${restaurantList}`);
    // console.log(model.all());
    
    // res.json(restaurantList);
    
    

    // connection.query(selectRestaurants, (err, results) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     else {
    //         // console.log(results);
    //         return res.json({
    //             data: results
    //         })
    //     }
    // });
});

router.get('/api/restaurants/:id', (req, res) => {
    let tempId = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(Number.isInteger(req.params.id));
    console.log(Number.isInteger(tempId));

    model.updateVisit(tempId);
    res.redirect("/api/restaurants");

    // connection.query(`UPDATE restaurants SET visited = true WHERE id = ${tempId}`, (err, res) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     else {
    //         return res.sendStatus(200);
    //     }
    // });
});

router.get('/api/restaurants/rate/:id', (req, res) => {
    let tempId = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(Number.isInteger(req.params.id));
    console.log(Number.isInteger(tempId));

    model.updateRating(tempId);
    res.redirect("/api/restaurants");

    // connection.query(`UPDATE restaurants SET visitAgain = false WHERE id = ${tempId}`, (err, results) => {
    //     if(err) {
    //         return res.send(err)
    //     }
    //     else {
    //         return res.sendStatus(200);
    //     }
    // });
});

//*********************************needs to be uncommented later************************************************** */
router.post('/api/restaurants/create', bodyParser.urlencoded(), function(req, res) {
//********************************************************************************************************** */
    let restaurantName = String(Object.keys(req.body));
    // let sRestName = JSON.stringify(req.body);
    // console.log(`Stingified restaurant name: ${sRestName}`);

    model.addRestaurant(restaurantName);

    // connection.query(`INSERT INTO restaurants (name) VALUES ('${restaurantName}')`, (err, results) => {
    //     if(err) {
    //         console.log(err);
    //         return res.send(err)
    //     }
    //     else {
    //         return res.sendStatus(200);
    //     }
    // });
});

module.exports = router;