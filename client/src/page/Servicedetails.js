import React, { Component } from "react";
import axios from 'axios';
import parse from 'html-react-parser';

class Servicedetails extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        services: [],
        id: '',
        title: '',
        servicesname: '',
        description: '',
        serviceimage: '',
        authorName:'',
        error: null,
        isLoading: true
    }
    
  }

  componentDidMount() {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/getSingleServiceByName/';
    axios.get(url+`${params.servicesname}`)
        .then(response => {
            this.setState({ 
                isLoading: false,
                id:response.data._id,
                title: response.data.title,
                servicesname: response.data.servicesname,
                description: response.data.description,
                serviceimage:response.data.serviceimage,
                authorName:response.data.author[0].name });
        })
        .catch(error => this.setState({ error, isLoading: false }));
  }
  
  render() {
    const { title, description, serviceimage, authorName } = this.state;
    
    return (
      <div>
        <section className="relative about-banner">	
            <div className="overlay overlay-bg"></div>
            <div className="container">				
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="about-content col-lg-12">
                        <h1 className="text-white">
                            Blog Details Page				
                        </h1>	
                        <p className="text-white link-nav"><a href="index.html">Home </a>  <span className="lnr lnr-arrow-right"></span><a href="blog-home.html">Blog </a> <span className="lnr lnr-arrow-right"></span> <a href="blog-single.html"> Blog Details Page</a></p>
                    </div>	
                </div>
            </div>
        </section>        
        <section className="post-content-area single-post-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                        <div className="single-post row">
                            <div className="col-lg-12">
                                <div className="feature-img">
                                    <img className="img-fluid" src={"/images/"+serviceimage} alt=""></img>
                                </div>									
                            </div>
                            <div className="col-lg-3  col-md-3 meta-details">
                                <ul className="tags">
                                    <li><a href="#">{title}</a></li>
                                </ul>
                                <div className="user-details row">
                                    <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                                    <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                                    <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                                    <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>
                                    <ul className="social-links col-lg-12 col-md-12 col-6">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-github"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                    </ul>																				
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                {parse(description)}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 sidebar-widgets">
                        <div className="widget-wrap">
                            <div className="single-sidebar-widget search-widget">
                                <form className="search-form" action="#">
                                    <input placeholder="Search Posts" name="search" type="text"></input>
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </form>
                            </div>
                            <div className="single-sidebar-widget user-info-widget">
                                <img src="img/blog/user-info.png" alt=""></img>
                                <a href="#"><h4>{authorName}</h4></a>
                                <p>
                                    Senior blog writer
                                </p>
                                <ul className="social-links">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-github"></i></a></li>
                                    <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                </ul>
                                <p>
                                    Boot camps have its supporters andit sdetractors. Some people do not understand why you should have to spend money on boot camp when you can get. Boot camps have itssuppor ters andits detractors.
                                </p>
                            </div>
                            <div className="single-sidebar-widget popular-post-widget">
                                <h4 className="popular-title">Popular Posts</h4>
                                <div className="popular-post-list">
                                    <div className="single-post-list d-flex flex-row align-items-center">
                                        <div className="thumb">
                                            <img className="img-fluid" src="img/blog/pp1.jpg" alt=""></img>
                                        </div>
                                        <div className="details">
                                            <a href="blog-single.html"><h6>Space The Final Frontier</h6></a>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="single-post-list d-flex flex-row align-items-center">
                                        <div className="thumb">
                                            <img className="img-fluid" src="img/blog/pp2.jpg" alt=""></img>
                                        </div>
                                        <div className="details">
                                            <a href="blog-single.html"><h6>The Amazing Hubble</h6></a>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="single-post-list d-flex flex-row align-items-center">
                                        <div className="thumb">
                                            <img className="img-fluid" src="img/blog/pp3.jpg" alt=""></img>
                                        </div>
                                        <div className="details">
                                            <a href="blog-single.html"><h6>Astronomy Or Astrology</h6></a>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>
                                    <div className="single-post-list d-flex flex-row align-items-center">
                                        <div className="thumb">
                                            <img className="img-fluid" src="img/blog/pp4.jpg" alt=""></img>
                                        </div>
                                        <div className="details">
                                            <a href="blog-single.html"><h6>Asteroids telescope</h6></a>
                                            <p>02 Hours ago</p>
                                        </div>
                                    </div>                                                          
                                </div>
                            </div>
                            <div className="single-sidebar-widget ads-widget">
                                <a href="#"><img className="img-fluid" src="img/blog/ads-banner.jpg" alt=""></img></a>
                            </div>
                                                      
                        </div>
                    </div>
                </div>
            </div>	
        </section>
        
      </div>
    );
  }
}
 
export default Servicedetails;