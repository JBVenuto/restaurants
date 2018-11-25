import React from "react";

const AllRestaurants = (props) => (
    <div className="card">
        <div className="card-body">
            {props.name}
        </div>
    </div>   
);

export default AllRestaurants;