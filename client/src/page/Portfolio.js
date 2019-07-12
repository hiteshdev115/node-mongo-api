import React, { Component } from "react";
import axios from 'axios';
import LazyLoad from 'react-lazyload';

import Seo from '../page/SeoMeatData';

class Portfolio extends Component {
  
  constructor() {
    super()
    this.state = {
      projects:[],
      error:null,
      isLoading: true,
    }
  }
  
  componentDidMount() {
    this.getLatestSixProjects(); 
  }

  getLatestSixProjects = () => {
        const url = 'http://localhost:3001/api/allproject/';
        axios.get(url)
        .then(response => {
                this.setState({
                  isLoading: false,
                  projects: response.data
                })
                console.log(response.data);		
        })
        .catch(error => this.setState({ error, isLoading: false }));  
  }
  
  
    
  
  render() {    
    
    const { projects, error, isLoading } = this.state;   
    
    return (
      <div>     
          <Seo/>
          <section className="banner-area relative blog-home-banner" id="home">	
            <div className="overlay overlay-bg"></div>
            <div className="container">				
              <div className="row d-flex align-items-center justify-content-center">
                <div className="about-content blog-header-content col-lg-12">
                  <h1 className="text-white">
                    Dude You’re Getting
                    a Telescope				
                  </h1>	
                  <p className="text-white">
                    There is a moment in the life of any aspiring astronomer that it is time to buy that first
                  </p>
                  <a href="/" className="primary-btn">View More</a>
                </div>	
              </div>
            </div>
          </section>
          
          {error ? <p>{error.message}</p> : null}
          
          <section className="portfolio-area section-gap" id="portfolio">
                <div className="container">
		            <div className="row d-flex justify-content-center">
		                <div className="menu-content pb-70 col-lg-8">
		                    <div className="title text-center">
		                        <h1 className="mb-10">Our Latest Featured Projects</h1>
		                        <p>Who are in extremely love with eco friendly system.</p>
		                    </div>
		                </div>
		            </div>
                    
                    <div className="filters-content" id="portfolio-section">
                        <div className="row">
                            {error ? <p>{error.message}</p> : null}
                            {!isLoading ? (
                                projects.map(project => {
                                const { _id, title, category, projectimage } = project;											
                                return (	
                                    <LazyLoad key={_id} height={50} offset={[-100, 100]}>									
                                    <div className="single-portfolio col-6 remove-hover" key={_id}>
                                        <div className="relative">
                                            <div className="thumb">
                                                <img className="image img-fluid" src={"/images/"+projectimage} alt={title} title={title}></img>
                                            </div>												
                                        </div>
                                        <div className="p-inner">
                                            <h4>{title}</h4>
                                            <div className="cat">{category}</div>
                                        </div>
                                    </div>
                                    </LazyLoad>
                                );
                                }) 
                            ) : (
                                    <h3>Portfolio should be appear in short time....</h3>
                            )}
                            
                        </div>
                    </div>                    
                </div>
            </section>




      </div>
    );
  }
}
 
export default Portfolio;