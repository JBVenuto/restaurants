import React, { Component } from 'react';
import Visited from "./Visited";
import NotVisited from "./NotVisited";


class Lists extends Component {

    constructor() {
        super();
        this.state = {
          toVisit: [],
          alreadyBeen: [],
        }
    }

    componentWillMount (props) {
        // this.sortRestaurants();
        console.log(props.restaurants.toVisit);
    }

    sortRestaurants(props) {
        if (!props.restaurants.visited) {
            this.state.toVisit.push(props.restaurants)
        }
        else {
            this.state.alreadyBeen.push(props.restaurants)
        }
        
    }

    render() {
        return (
            <div>
            <div className="col">
            <h3>Not Visited Restaurants</h3>
            {this.state.toVisit.map( toVisit =>
              <NotVisited 
                id={toVisit.id}
                key={toVisit.key}
                name={toVisit.name}
                visited={toVisit.visited}
                visitAgain={toVisit.visitAgain}               
              />
            )}
          </div>
          <div className="col">
            <h3>Visited Restaurants</h3>
            {this.state.alreadyBeen.map( alreadyBeen =>
              <Visited 
                id={alreadyBeen.id}
                key={alreadyBeen.key}
                name={alreadyBeen.name}
                visited={alreadyBeen.visited}
                visitAgain={alreadyBeen.visitAgain}               
              />
            )}
          </div>
          </div>
        )
    }
}

export default Lists;