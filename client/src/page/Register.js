import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
//import { Link } from 'react-router-dom';
//import './Login.css';
import MetaTags from 'react-meta-tags';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name:'',
      username: '',
      email:'',
      password: '',
      location:'',
      age:'',

      pageTitle:'',
			pageUrl:'',
			metaTitle:'',
			metaDescription:'',
      metaImageUrl:'',
      index:'',
      follow:''
    };
  }

  componentDidMount() {
    this.getSeoMetaData();
  }

  getSeoMetaData = () => {
		var cUrl = window.location.href;
		console.log(cUrl);
		const url = 'http://localhost:3001/api/getSingleSeoByName/';
		axios.get(url+encodeURIComponent(cUrl))
		.then(response => { 
			console.log(response.data);
			if(response.data){
			  this.setState({
				pageTitle:response.data.pageTitle,
				pageUrl:response.data.pageUrl,
				metaTitle:response.data.metaTitle,
				metaDescription:response.data.metaDescription,
        metaImageUrl:response.data.metaImageUrl,
        index:response.data.index,
        follow:response.data.follow
			  })         
			}        
		});
	}

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    //console.log('submit form');
    const { name, email, username, password, location, age } = this.state;
    var url = 'http://localhost:3001/api/register';
    axios.post(url, { name, email, username, password, location, age })
      .then((result) => {
        //console.log(result);
        this.props.history.push("/login")
      });
  }

  render() {
    const { name, email, username, password, location, age, pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl, index, follow } = this.state;
    return (
      <div>
        <MetaTags>
          <title>{pageTitle}</title>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="cleversamurai" />
          <meta name="description"  content={metaDescription}/>
          <meta property="og:title" content={metaTitle} />
          <meta property="og:image" content={metaImageUrl} />
          <meta property="og:url" content={pageUrl} />
          <meta name="ROBOTS" content={index+', '+follow} />
        </MetaTags>
        <section className="post-content-area section-gap">
        <div className="container">
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="mb-10">Sign up</h2>

            <input type="text" className="common-input mb-20 form-control" placeholder="Your name" name="name" value={name} onChange={this.onChange} required/>
            
            <input type="text" className="common-input mb-20 form-control" placeholder="Your username" name="username" value={username} onChange={this.onChange} required/>

            <input type="email" className="common-input mb-20 form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required/>
                      
            <input type="password" className="common-input mb-20 form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
            
            <input type="text" className="common-input mb-20 form-control" placeholder="Your address" name="location" value={location} onChange={this.onChange}/>
            
            <input type="text" className="common-input mb-20 form-control" placeholder="Your age" name="age" value={age} onChange={this.onChange}/>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          </form>
        </div>
        </section>
      </div>
    );
  }
}

export default Create;