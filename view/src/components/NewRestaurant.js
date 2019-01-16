import React from "react";

const NewRestaurant = (props) => (
    <form onSubmit={props.onSubmit}>
        <input 
            type="text" 
            name="newRestaurantName"  
            value={props.value}
            onChange={props.onChange}
        />
        <input 
            type="submit" 
            className="btn btn-secondary"
            onClick={props.onClick}
            value="Add Restaurant"
        />
            {/* Add Restaurant */}
        {/* </input> */}
    </form>
);

export default NewRestaurant;