import React from 'react';

//import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header"><a href="/" class="navbar-brand">Our Awesome Store</a>
            <button type="button" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span
                class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
            </div>
            <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li role="presentation" class=""><a role="button" href="#">Home</a></li>
                <li role="presentation" class=""><a role="button" href="#">Shop</a></li>
                <li role="presentation" class=""><a role="button" href="#"><span
                class="glyphicon glyphicon-shopping-cart"></span>Cart</a></li>
            </ul>
            </div>
        </div>
        </nav>
    );
  }
}

export default Header;