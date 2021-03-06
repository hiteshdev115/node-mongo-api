import React, { Component } from "react";
//import ShowMoreText from 'react-show-more-text'; 
import axios from 'axios';
import { MDBIcon } from 'mdbreact';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import Moment from 'react-moment';
//import 'moment-timezone';
import { DataTable } from 'react-data-components';
//import {DataTable, DataColumn, Pagination} from 'react-bootstrap-datatable'


class Bloglist extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      tableRows: [],
      error:null,
      isLoading: true,
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails')),
    };
    this.deleteBlog = this.deleteBlog.bind(this);

  }

  componentWillMount=async() =>{    
    fetch('http://localhost:3001/api/allblog')
     .then(response => response.json())
     .then(data => {
          this.setState({
            isLoading: false,
            blogs: data
          })
          //console.log(data);
      })
      .catch(error => this.setState({ error, isLoading: false }));  
  }
    
  deleteBlog= (blogid) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert alert-primary" role="alert">
            <h4>Are you sure you want to delete this item permanantly?</h4>
            <br/>
            <p>
            <button className="genric-btn primary circle arrow" onClick={onClose}>No</button>&nbsp;&nbsp;&nbsp;
            <button className="genric-btn success circle arrow" onClick={() => {
                const { _id } = this.state.adminLoginUser;    
                var url = 'http://localhost:3001/api/deleteblog/'+blogid+'/user/'+_id;
                axios.delete(url)
                .then(response => {
                    if(response){
                      this.componentWillMount();
                    }
                })
                .catch(error => this.setState({ error }));
                onClose()
            }}>Yes, Delete it!</button>
            </p>
          </div>
        )
      }
    })
  }
 
  
  render() {
    
    var columns = [
      { title: 'Title', keys:'title', prop: 'title', sortable: true, width:300  },
      { title: 'Blog Image', keys:'image', prop: 'blogimage' },
      { title: 'Status', keys:'status', prop: 'status', sortable: true, }, 
      { title: 'Created At', keys:'createDate', prop: 'created_at', sortable: true, }, 
      { title: 'Updated At', keys:'updateDate', prop: 'updated_at', sortable: true, },
      { title: 'Action', keys:'action', prop:'action'}
    ];

    const { blogs, isLoading } = this.state;
        
    let dataTableValue = [];
    if(isLoading === true){
      dataTableValue.push(<div key="fail">Loading....</div>);
    } else {
      for(let i = 0; i< blogs.length; i++){
        //console.log(blogs[i].title);
        dataTableValue.push({
          id:i,
          title:blogs[i].title,
          blogimage:blogs[i].blogimage ? <img src={"/images/"+blogs[i].blogimage} alt="flag" width="100"></img> : <img src="/images/default-blog.jpg" alt="flag" width="100"></img>,
          status:blogs[i].isActive ? <p className="text-success">Published</p> : <p className="text-secondary">Draft</p>,
          created_at:<Moment format="YYYY-MM-DD HH:mm">{blogs[i].created_at}</Moment>,
          updated_at:<Moment format="YYYY-MM-DD HH:mm">{blogs[i].updated_at}</Moment>,
          action:<div><a href={"./edit/"+blogs[i]._id} className="trash"><MDBIcon icon="pen-alt" /></a> | 
          <a onClick={() => this.deleteBlog(blogs[i]._id)} className="trash"><MDBIcon far icon="trash-alt" /></a></div>
        });
      }
    }
    
    return (
          <div className="container list-space">
            <div className="section-top-border">
                <h3 className="mb-30">Blog Management</h3>
                <DataTable
                  className="pagination"
                  keys="123456"
                  columns={columns}
                  initialData={dataTableValue}
                  initialPageLength={5}
                  initialSortBy={{ prop: 'created_at', order: 'descending' }}
                  pageLengthOptions={[ 5, 10, 20, 40, 60, 80, 100 ]}
                />
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <a href="./addnewblog" className="genric-btn primary circle">ADD NEW</a>
                    </div>
                </div>
            </div>
            
          </div>  
    );
  }
}
export default Bloglist;