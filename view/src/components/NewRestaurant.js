import React from "react";

const NewRestaurant = (props) => (
    <form action='/api/restaurants/create' method="POST">
        <input type="text" name="newRestaurantName"  />
        <button 
            type="button" 
            className="btn btn-secondary"
            onClick={props.onClick}
        >
            Add Restaurant
        </button>
    </form>
);

export default NewRestaurant;