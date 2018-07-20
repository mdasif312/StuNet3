import React, { Component } from 'react';
import Auth from './components/Auth';
import Main from './components/Main';
import Home from './components/Home';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  constructor(props){
    super(props);
    this.state =  {
        isLoggedIn : false
    }
  }
  render() {
    return (
      <div className="App" >
        { this.state.isLoggedIn? <Home /> : <Main />}  
      </div>
    );
  }
}

export default App;
