import React from "react";

const NewRestaurant = (props) => (
    <form>
        <input type="text" name="newRestaurantName" />
        <button type="button" className="btn btn-secondary">Add Restaurant</button>
    </form>
);

export default NewRestaurant;