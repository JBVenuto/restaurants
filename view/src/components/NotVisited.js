import React from "react";

const NotVisited = (props) => (
    <div className="card">
        <div className="card-body">
            <span>
                {props.name}
            </span>
            <button 
                className="btn btn-secondary"
                id="visit-button"
                type="button"
                button-id={props.id}
                visited-status={props.visited}
                onClick={props.onClick}
            >
                Visited
            </button>
        </div>
    </div>   
);

export default NotVisited;