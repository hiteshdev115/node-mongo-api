import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
//import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';


class Header extends Component {
  
    
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userdetails');
    window.location.href="/login";
  }

  render() {
    this.state = {
      loginUser: JSON.parse(localStorage.getItem('userdetails'))
    }
    //console.log('=====>'+this.state.loginUser);
    var username = '';
    var isAdmin = '';
    if(this.state.loginUser === null){
      username = '';
    } else {
      username = this.state.loginUser.name;
      isAdmin = this.state.loginUser.admin;

    }
    
    if(isAdmin === true){
      if(window.location.href.indexOf("admin") > -1){
        console.log('admin');
        return (
          <header id="header">
          <div className="container main-menu">
            <div className="row align-items-center justify-content-between d-flex">
              <div id="logo">
                <a href="/admin/dashboard"><img className="logo" src="/images/cs-logo.png" alt="clever samurai" title="clever samurai" /></a>
              </div>
              <nav id="nav-menu-container">
                <ul className="nav-menu">
                  <li><Link to="/admin/dashboard"> Home </Link></li>
                  <li>Management
                    <ul>
                      <li><Link to="/admin/blog-manage"> Blog Management </Link></li>
                      <li><Link to="/admin/service-manage"> Services Management </Link></li>
                      <li><Link to="/admin/user-manage"> User Management </Link></li>
                    </ul>
                  </li>
                  <li><Link to="/admin/settings"> Settings </Link></li>
                  
                  {username ? <li className="loginuser">Hello..{username}
                        <ul className="loginuser-submenu">
                          <li onClick={this.logout}>Logout</li>
                        </ul>
                      </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                  }             
                </ul>
              </nav>		
            </div>
          </div>
          </header>      
        );
      }
      else{
        return (
          <header id="header">
            <div className="container main-menu">
              <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                  <a href="/"><img className="logo" src="./images/cs-logo.png" alt="clever samurai" title="clever samurai" /></a>
                </div>
                <nav id="nav-menu-container">
                  <ul className="nav-menu">
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/blog"> Blog </Link></li>
                    <li><Link to="/services"> Services </Link>
                      <ul>
                        <li>Service 1</li>
                        <li>Service 2</li>
                      </ul>
                    </li>
                    <li><Link to="/contact"> Contact us </Link></li>
                    {username ? <li className="loginuser">Hello..{username}
                          <ul className="loginuser-submenu">
                            <li onClick={this.logout}>Logout</li>
                          </ul>
                        </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                    }             
                  </ul>
                </nav>		
              </div>
            </div>
          </header>
        );     
      }
      
    } else {
      return (
        <header id="header">
        <div className="container main-menu">
          <div className="row align-items-center justify-content-between d-flex">
            <div id="logo">
              <a href="/"><img className="logo" src="./images/cs-logo.png" alt="clever samurai" title="clever samurai" /></a>
            </div>
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/blog"> Blog </Link></li>
                <li><Link to="/services"> Services </Link>
                  <ul>
                    <li>Service 1</li>
                    <li>Service 2</li>
                  </ul>
                </li>
                <li><Link to="/contact"> Contact us </Link></li>
                {username ? <li className="loginuser">Hello..{username}
                      <ul className="loginuser-submenu">
                        <li onClick={this.logout}>Logout</li>
                      </ul>
                    </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                }             
              </ul>
            </nav>		
          </div>
        </div>
        </header>      
      );
    }
    
  }
}

export default Header;