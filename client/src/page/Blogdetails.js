import React, { Component } from "react";
import axios from 'axios';
import parse from 'html-react-parser';
import dateFormat from 'dateformat';
import { Facebook, Twitter } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';


class Blogdetails extends Component {
    

  constructor(props) {
    super(props)
    this.state = {
        blogs: [],
        id: '',
        title: '',
        subtitle:'',
        blogname: '',
        description: '',
        blogimage: '',
        authorName:'',
        created_at:'',
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
                subtitle: response.data.subtitle,
                blogname: response.data.blogname,
                description: response.data.description,
                created_at: response.data.created_at,
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
    const url = 'http://www.google.com';
    const shareText = 'Lightweight social sharing buttons for React. No tracking. Just fun.';
    /*const tumblr = {
      title: 'React Sharingbuttons',
      caption: 'Lightweight social sharing buttons for React. No tracking. Just fun.',
      content: url,
    };*/
  
    const buttonsWrapperStyles = {
      padding: 50,
      marginTop: 75,
      marginBottom: 100,
    };
    const { isLoading, blogs, error, title, subtitle, created_at, description, blogimage, authorName } = this.state;
    //console.log(error);
    return (
      <div>
        <section className="relative about-banner"> 
            &bnsp;
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
                                    <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">{authorName}</a> <span className="lnr lnr-user"></span></p>
                                    <p className="date col-lg-12 col-md-12 col-6"><a href="#">{dateFormat(created_at, "mediumDate")}</a> <span className="lnr lnr-calendar-full"></span></p>
                                    <ul className="social-links col-lg-12 col-md-12 col-6" style={buttonsWrapperStyles}>
                                        <li><Facebook url={url} /></li>
                                        <li><Twitter url={url} shareText={shareText} /></li>
                                        <li><a href="#"><i className="fa fa-github"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                    </ul>                                                                               
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                            <h3 class="mt-20 mb-20">{subtitle}</h3>
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