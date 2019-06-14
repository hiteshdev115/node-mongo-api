import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import './Login.css';

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
      loginUser: JSON.parse(localStorage.getItem('userdetails'))
    }
    if(this.state.loginUser === null){
      //open login screen
      //console.log('nullll');
    } else {
      //console.log('else');
      this.props.history.push('/');
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
        console.log("API RESPONSE");
        console.log(result);
        
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('userdetails', result.data.userData);
        this.setState({ message: '' });
        //this.props.history.push('/');
        var resultObject = JSON.parse(result.data.userData);
        if(resultObject.admin === true){
          this.props.history.push('/admin/dashboard');
        } else {
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
    );
  }
}

export default Login;