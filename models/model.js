const connection = require('./connection');

const model = {

    // Get all of the restaurant data from the database
    all: (cb) => {
        connection.query('SELECT * FROM restaurants', (err, res) => {
            // console.log(`res is ${res}`);
            if (err) {
                throw err;
            }
            cb(res);
            
            // if(err) {
            //     throw err
            // }
            // else {
            //     console.log(results);
            //     console.log(res);
                
            //     // return res.json({
            //     //     data: res
            //     // })
            // }
        });
    },

    // Add a restaurant to the database
    addRestaurant: (restaurantName) => {
        // let restaurantName = String(Object.keys(req.body));
    // let sRestName = JSON.stringify(req.body);
    // console.log(`Stingified restaurant name: ${sRestName}`);

        connection.query(`INSERT INTO restaurants (name) VALUES ('${restaurantName}')`, (err, results) => {
            if(err) {
                console.log(err);
                // return res.send(err)
                throw err;
            }
            else {
                // return res.sendStatus(200);
                console.log('restaurant added');
            }
    });
    },

    // Update the visited status for a restaurant chosen by the user
    updateVisit: (tempId) => {
        // let tempId = parseInt(req.params.id);
        // console.log(req.params.id);
        // console.log(Number.isInteger(req.params.id));
        // console.log(Number.isInteger(tempId));
        console.log(`temptId in model: ${tempId}`);

        connection.query(`UPDATE restaurants SET visited = true WHERE id = ${tempId}`, (err, res) => {
            if(err) {
                // return res.send(err)
                throw err
            }
            else {
            //     return res.sendStatus(200);
                console.log('updated visited status');
            }
        });
    },

    // Update the rating for a restaurant after the user vists and does not want to go back
    updateRating: (tempId) => {
        // let tempId = parseInt(req.params.id);
        // console.log(req.params.id);
        // console.log(Number.isInteger(req.params.id));
        // console.log(Number.isInteger(tempId));

        connection.query(`UPDATE restaurants SET visitAgain = false WHERE id = ${tempId}`, (err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                // return res.sendStatus(200);
                console.log('updated rating');
            }
        });
    }
}

module.exports = model;