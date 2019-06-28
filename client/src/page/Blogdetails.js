import React, { Component } from "react";
import axios from 'axios';
import parse from 'html-react-parser';
import dateFormat from 'dateformat';

class Blogdetails extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        blogs: [],
        id: '',
        title: '',
        blogname: '',
        description: '',
        blogimage: '',
        authorName:'',
        error: null,
        isLoading: true
    }
    this.getRelatesPost();
  }

  componentDidMount() {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/getSingleBlogByName/';
    axios.get(url+`${params.blogname}`)
        .then(response => {
            this.setState({ 
                isLoading: false,
                id:response.data._id,
                title: response.data.title,
                blogname: response.data.blogname,
                description: response.data.description,
                blogimage:response.data.blogimage,
                authorName:response.data.author[0].name });
        })
        .catch(error => this.setState({ error, isLoading: false }));
       
  }
  
  getRelatesPost = () => {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/blog/getRandomBlog/';
    axios.get(url+`${params.blogname}`)
        .then(response => {
                this.setState({
                  isLoading: false,
                  blogs: response.data
                })
                //console.log(this.state.blogs);
        })
        .catch(error => this.setState({ error, isLoading: false }));  
  }
  
  render() {
    const { isLoading, blogs, error, title, description, blogimage } = this.state;
    //console.log(error);
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
        {error ? <p>{error.message}</p> : null}
        <section className="post-content-area single-post-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                        <div className="single-post row">
                            <div className="col-lg-12">
                                <div className="feature-img">
                                    <img className="img-fluid" src={"/images/"+blogimage} alt=""></img>
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
                            <div className="single-sidebar-widget popular-post-widget">
                                <h4 className="popular-title">Popular Posts</h4>
                                <div className="popular-post-list">
                                    {!isLoading ? (
                                        blogs.map(blog => {
                                            const { _id, title, created_at, blogname, blogimage } = blog;
                                                if(blogimage){
                                                    var ImgParts = blogimage.split('.');
                                                    var resized_small = ImgParts[0]+'_resized-small.png';
                                                    
                                                }
                                                return (
                                                    <div className="single-post-list d-flex flex-row align-items-center" key={_id}>
                                                        <div>
                                                            <img className="img-responsive" src={"/images/"+resized_small} alt={title}></img>
                                                        </div>
                                                        <div className="details">
                                                            <a href={"/blog/"+blogname}><h6>{title}</h6></a>
                                                            <p>{dateFormat(created_at, "mediumDate")}</p>
                                                        </div>
                                                    </div>
                                                );
                                        }) 
                                    ) : (
                                    <h3>Loading...</h3>
                                    )}
                                </div>
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
 
export default Blogdetails;