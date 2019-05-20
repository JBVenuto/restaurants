const connection = require('./connection');

const model = {

    // Get all of the restaurant data from the database
    all: (cb) => {
        connection.query('SELECT * FROM restaurants', (err, res) => {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    // Add a restaurant to the database
    addRestaurant: (restaurantName) => {


        connection.query(`INSERT INTO restaurants (name) VALUES ('${restaurantName}')`, (err, results) => {
            if(err) {
                console.log(err);
                throw err;
            }
            else {
                console.log('restaurant added');
            }
    });
    },

    // Update the visited status for a restaurant chosen by the user
    updateVisit: (tempId) => {

        console.log(`temptId in model: ${tempId}`);

        connection.query(`UPDATE restaurants SET visited = true WHERE id = ${tempId}`, (err, res) => {
            if(err) {
                throw err
            }
            else {
                console.log('updated visited status');
            }
        });
    },

    // Update the rating for a restaurant after the user vists and does not want to go back
    updateRating: (tempId) => {


        connection.query(`UPDATE restaurants SET visitAgain = false WHERE id = ${tempId}`, (err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                console.log('updated rating');
            }
        });
    }
}

module.exports = model;