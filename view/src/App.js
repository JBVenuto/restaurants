// Import React and the main style sheet
import React, { Component } from 'react';
import './App.css';
// import Restaurants from './restaurants.json';

// Components to be imported
import Container from "./components/Container"
import Title from "./components/Title";
// import RestaurantCard from "./RestaurantCard";
import NotVisited from "./components/NotVisited";
import Visited from "./components/Visited";
import All from "./components/All";
// import NewRestaurant from "./NewRestaurant";

class App extends Component {
  // Constructor to give state to the component.
  // This I think this will only be used for adding new restaurants
  constructor(props) {
    super(props);
    this.state = {
      // restaurantList: Restaurants,
      restaurants: [],
      toVisit: [],
      alreadyBeen: [],
    }
  }

  componentWillMount () {
    this.getRestaurants();
    // this.sortRestaurants();
  }

  componentDidMount () {
    console.log('first log of restaurant list: ', this.state.restaurants);
    this.sortRestaurants();
  }

  getRestaurants () {
    fetch('/api/restaurants')
    .then(res => res.json())
    .then(res => this.setState({ restaurants: res.data }))    
  }

  sortRestaurants() {
    this.state.restaurants.map( restaurant => {
      return !restaurant.visited ? this.state.toVisit.push(restaurant) : this.state.alreadyBeen.push(restaurant);
    })
  }

  render() {
    return (
      <Container>
        <Title />
        <div className="row">
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

          <div className="col">
            <h3>All Restaurants</h3>
            {this.state.restaurants.map( restaurants =>
              <All 
                id={restaurants.id}
                key={restaurants.key}
                name={restaurants.name}
                visited={restaurants.visited}
                visitAgain={restaurants.visitAgain}               
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
