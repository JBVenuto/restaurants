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
import NewRestaurant from "./components/NewRestaurant";


class App extends Component {
  // Constructor to give state to the component.
  // This I think this will only be used for adding new restaurants
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      toVisit: [],
      alreadyBeen: [],
    };
    this.sortRestaurants = this.sortRestaurants.bind(this);
    this.visitRestaurant = this.visitRestaurant.bind(this);
  }

  componentWillMount () {
    // this.getRestaurants();
    // this.sortRestaurants();
  }

  componentDidMount () {
    this.getRestaurants();
    this.sortRestaurants();
  }

  getRestaurants () {
    fetch('/api/restaurants')
    .then(res => res.json())
    .then(res => this.setState({ restaurants: res.data }))    
    // .then(res => console.log('fetch CL ', res.data))
  }

  sortRestaurants() {
    this.state.restaurants.map( restaurant => {
      return !restaurant.visited ? this.state.toVisit.push(restaurant) : this.state.alreadyBeen.push(restaurant);
    })
  }

  // NotBeen() {
  //   this.state.restaurants.map( restaurants => {
  //     return !restaurants.visited ?
  //     <NotVisited 
  //       key={restaurants.key}
  //       id={restaurants.id}
  //       name={restaurants.name}
  //       visited={restaurants.visited}
  //       visitAgain={restaurants.visitAgain}  
  //       onClick={this.visitRestaurant}
  //     /> : <span />
  //   })
  // }

  visitRestaurant = event => {
    let restid= parseInt(event.target.getAttribute('restnum'));
    console.log(event.target);
    console.log(Number.isInteger(event.target.getAttribute('restnum')));
    console.log(Number.isInteger(restid));
    console.log(event.target.className);
    fetch(`/api/restaurants/${restid}`);

    //change visited status in restaurants array
    this.setState({ visited: 1});

    //find object in not visited array
    let i = this.state.toVisit.findIndex(x => x.id === restid);
    let tempObj = this.state.toVisit[i]; 
    tempObj.visited = 1;
    // this.setState({ alreadyBeen: this.state.alreadyBeen.push(tempObj) });
  }

  render() {
    return (
      <Container>
        {this.sortRestaurants()}
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
            <NewRestaurant />
          </div>
        </div>         
         
      </Container> 
    )
  }
}

export default App;