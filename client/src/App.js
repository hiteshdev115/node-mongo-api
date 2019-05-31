import React, { Component } from 'react';
// { Glyphicon } from 'react-bootstrap';

//import { Header } from './components/HeaderComponent';
//import { Footer } from './components/FooterComponent';


//import logo from './logo.svg';
import './App.css';
import "./style.css";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./page/Home";
import Stuff from "./page/Stuff";
import Contact from "./page/Contact";

class App extends Component {
  render() {
    return (
      <HashRouter>
       <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
