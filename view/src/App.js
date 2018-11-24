// Import React and the main style sheet
import React, { Component } from 'react';
import './App.css';
import Restaurants from './restaurants.json';

// Components to be imported
import Container from "./components/Container"
import Title from "./components/Title";
// import RestaurantCard from "./RestaurantCard";
import NotVisited from "./components/NotVisited";
import Visited from "./components/Visited";
// import NewRestaurant from "./NewRestaurant";

class App extends Component {
  // Constructor to give state to the component.
  // This I think this will only be used for adding new restaurants
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: Restaurants,
      toVisit: [],
      alreadyBeen: [],
    }
  }

  componentWillMount () {
    this.sortRestaurants();
  }

  sortRestaurants() {
    this.state.restaurantList.map( restaurant => {
      return !restaurant.visited ? this.state.toVisit.push(restaurant) : this.state.alreadyBeen.push(restaurant);
    })
  }

  render() {
    return (
      <Container>
        <Title />
        <div className="row">
          <div className="col">
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
        {/* <NewRestaurant />  */}
      </Container> 
    )
  }
}

export default App;
