import React, { Component } from "react";
//import ShowMoreText from 'react-show-more-text'; 
import axios from 'axios';

class Bloglist extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      error:null,
      isLoading: true,
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
    };
    this.deleteBlog = this.deleteBlog.bind(this);
    
  }

  componentDidMount() {
    
    this.fetchAllBlog();
    
  }
  

  fetchAllBlog() {
    fetch('http://localhost:3001/api/allblog')
     .then(response => response.json())
     .then(data =>
        this.setState({
          isLoading: false,
          blogs: data
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
  
  deleteBlog= (blogid) => {
    const { _id } = this.state.adminLoginUser;
    //alert(blogid);
    console.log(blogid);
    
      var url = 'http://localhost:3001/api/deleteblog/'+blogid+'/user/'+_id;
      axios.delete(url)
      .then(response => {
          if(response){
            this.fetchAllBlog();
          }
      })
      .catch(error => this.setState({ error }));
  }
  
  
  render() {
    const { blogs, isLoading } = this.state;
    
    let rows = [];
    if(isLoading === true){
      rows.push(<div key="fail">Loading....</div>);
    } else {
      for(let i = 0; i< blogs.length; i++){
        //console.log(blogs[i].title);
        var j = i+1;
        rows.push(
          <div className="table-row" key={j}>
              <div className="serial">{j}</div>                                    
              <div className="visit">{blogs[i].title}</div>
              <div className="visit"> <img src={"/images/"+blogs[i].blogimage} alt="flag" width="100"></img></div>
              <div className="visit"> Created : {blogs[i].created_at}, Updated on : {blogs[i].updated_at}</div>
              <div className="visit">
                <a href={"./edit/"+blogs[i]._id} className="trash">Edit</a>&nbsp; | &nbsp;
                <a onClick={() => this.deleteBlog(blogs[i]._id)} className="trash">Delete</a>
              </div>
          </div>
        )
      }
    }
    
    return (
          <div className="container list-space">
            <div className="section-top-border">
                <h3 className="mb-30">Blogs</h3>
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <a href="./addnewblog" className="genric-btn primary circle">ADD NEW</a>
                        <div className="table-head">
                            <div className="serial">#</div>
                            <div className="visit">Blog Title</div>
                            <div className="visit">Image</div>                            
                            <div className="visit">Created Date</div>
                            <div className="visit">Actions</div>
                        </div>
                        {rows}
                    </div>
                </div>
            </div>
          </div>      
    );
  }
}
 
export default Bloglist;