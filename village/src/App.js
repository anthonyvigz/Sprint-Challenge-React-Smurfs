import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import EditSmurf from './components/EditSmurf';
import { Route, Link, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then( (response) => {
        this.setState( { smurfs: response.data })
      })
      .catch((err) => {
        console.log("Error:", err)
      })

  }

  updateSmurfs = (newsmurfs) => {
    this.setState( { smurfs: newsmurfs })
  }

  // add any needed code to ensure that the 
  // smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state 
  // and pass them down to props.
  render() {
    return (
      <div className="App">
        <Route 
          path="/smurf-form"
          render={
            (props) => 
              <SmurfForm {...props} updateSmurfs={this.updateSmurfs} />
          } />
        <Route 
          path="/"
          exact
          render={
            (props) =>
              <Smurfs {...props} smurfs={this.state.smurfs} />
          } />
        <Route 
          path="/smurfs/:id"
          render={
            (props) =>
              <EditSmurf {...props} updateSmurfs={this.updateSmurfs} smurfs={this.state.smurfs} />
          } />
        <nav>
          <NavLink to="/">Smurfs</NavLink>
          <NavLink to="/smurf-form">Add A Smurf</NavLink>
        </nav>
      </div>
    );
  }
}

export default App;
