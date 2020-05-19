import React, { Component } from 'react'
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

export default class Main extends Component {
  render() {
    return (
      <Router>
      <div>
        <Navbar />
        <Routes />
      </div>
      </Router>
    )
  }
}
