const mysql = require('mysql2');

let connection;

// Create the connection to JAWSDB
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
    console.log("connected to jawsDB");
} 

// If unable to connect to JAWSDB connect to the local database
else {

   connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "restaurantdb"
    });
    console.log("connected to localhost");
}

// Make the connection to the database and return an error if one is encountered
connection.connect(err => {
    if(err) {
        return err;
    }
});

// Export the connection to MySQL for use in other files
module.exports = connection;