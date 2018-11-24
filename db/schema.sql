-- Make the database to hold the pizza table
DROP DATABASE IF EXISTS restaurantDB;
CREATE DATABASE restaurantDB;
USE restaurantDB;

-- Make the table to hold the pizza information
CREATE TABLE restaurants
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    visited BOOLEAN DEFAULT false,
    visitAgain BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
);