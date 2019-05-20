// Required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./controller/controller');

// Set the port as either the given port from Heroku or local port 8080
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// Use body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use the routes set up in the controller
app.use(routes);

app.use(cors());

// Set the application to listen on the port
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});