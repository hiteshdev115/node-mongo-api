import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Seo from '../page/SeoMeatData';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };
    
    this.checkLogin();
    
  }
  checkLogin(){
    this.state = {
      loginUser: JSON.parse(localStorage.getItem('userdetails')),
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
    }
    if(this.state.loginUser === null){
      //open login screen
      console.log('nullll');
    } else {
      console.log(this.state.loginUser.admin);
      this.props.history.push('/login');    
    }
  }

    
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }


  onSubmit = (e) => {
    e.preventDefault();
    var url = 'http://localhost:3001/api/login';
    const { username, password } = this.state;
    //console.log(username);
    axios.post(url, { username, password })
      .then((result) => {
        //console.log("API RESPONSE");
        //console.log(result);
        this.setState({ message: '' });
        //this.props.history.push('/');
        var resultObject = JSON.parse(result.data.userData);
        if(resultObject.admin === true){
          localStorage.setItem('admin-jwtToken', result.data.token);
          localStorage.setItem('admin-userdetails', result.data.userData);
          this.props.history.push('/admin/dashboard');
        } else {
          localStorage.setItem('jwtToken', result.data.token);
          localStorage.setItem('userdetails', result.data.userData);
          this.props.history.push('/');
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log('===Error=='+error);
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { username, password, message } = this.state;
    
    return (
      <div>
        <Seo />
        <section className="post-content-area section-gap">
          <div className="container">
            <form className="form-signin" onSubmit={this.onSubmit}>
              {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                  { message }
                </div> : ''
              }
              <h2 className="mb-10">Sign in</h2>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="text" className="common-input mb-20 form-control" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" className="common-input mb-20 form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
              <p>
                Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
              </p>
            </form>
          </div>
        </section>   
      </div>   
    );
  }
}

export default Login;