// Import React and the main style sheet
import React, { Component } from 'react';
import './App.css';
// import Restaurants from './restaurants.json';
import axios from "axios";

// Components to be imported
import Container from "./components/Container"
import Title from "./components/Title";
// import RestaurantCard from "./RestaurantCard";
import NotVisited from "./components/NotVisited";
import Visited from "./components/Visited";
import NewRestaurant from "./components/NewRestaurant";


class App extends Component {
  // Constructor to give state to the component.
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      // toVisit: [],
      // alreadyBeen: [],
      restaurantName: ''
    };
    this.visitRestaurant = this.visitRestaurant.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
  }

  componentDidMount () {
    this.getRestaurants();
  }

  getRestaurants () {
    fetch('/api/restaurants')
    .then(res => res.json())
    .then(res => this.setState({ restaurants: res.data }))    
  }

  visitRestaurant = event => {
    let restid = parseInt(event.target.getAttribute('restnum'));
    console.log(event.target);
    console.log(Number.isInteger(event.target.getAttribute('restnum')));
    console.log(Number.isInteger(restid));
    console.log(event.target.className);
    fetch(`/api/restaurants/${restid}`);

    //change visited status in restaurants array
    // this.setState({ visited: true});

    // ---------- *** Below is closer to the correct way than the commented out above *** --------------
    //find object in not visited array
    // let i = this.state.toVisit.findIndex(x => x.id === restid);
    // let tempObj = this.state.toVisit[i]; 
    // tempObj.visited = 1;
    // this.setState({ alreadyBeen: this.state.alreadyBeen.push(tempObj) });

    // Change visited status
    let changeRestaurants = this.state.restaurants;
    console.log(changeRestaurants);
    let restIndex = changeRestaurants.map(function(x) {return x.id; }).indexOf(restid);
    console.log(restIndex);
    changeRestaurants[restIndex].visited = 1;
    console.log(changeRestaurants);

    this.setState({ restaurants: changeRestaurants });
  }

  handleChange = event => {
    this.setState({ restaurantName: event.target.value });
  }

  addRestaurant = event => {
    console.log('add button clicked!');
    console.log(`Restaurant Name: ${this.state.restaurantName}`);
    console.log(event);
    event.preventDefault();
    // fetch('/api/restaurants/create', {
    //   method: 'POST',
    //   headers: {'Content-type': 'application/x-www-form-urlencoded'},
    //   body: this.state.restaurantName
    // })
    axios.post({
      method: 'post',
      url: '/api/restaurants/create',
      data: {
        newRestName: this.state.restaurantName
      }
    });
  }

  render() {
    return (
      <Container>
        <Title />
        <div className="row">
          <div className="col">
            <h3>Not Visited Restaurants</h3>
             {this.state.restaurants.map( restaurants => { return !restaurants.visited ?
              <NotVisited 
                key={restaurants.key}
                id={restaurants.id}
                name={restaurants.name}
                visited={restaurants.visited}
                visitAgain={restaurants.visitAgain}  
                onClick={this.visitRestaurant}             
              /> : <div />
              }
             )} 
          </div>
          <div className="col">
            <h3>Visited Restaurants</h3>
            {this.state.restaurants.map( restaurants => { return restaurants.visited ?
              <Visited 
                id={restaurants.id}
                key={restaurants.key}
                name={restaurants.name}
                visited={restaurants.visited}
                visitAgain={restaurants.visitAgain}               
              /> : <div />
              }
            )}
          </div>
        </div>    
        <br></br> 
        <div className="row">
          <div className="col">
            <NewRestaurant
              value={this.state.value}
              onSubmit={this.addRestaurant}
              onChange={this.handleChange}
            />
          </div>
        </div>         
         
      </Container> 
    )
  }
}

export default App;