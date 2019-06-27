import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';



class Addnewblog extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          blogname: '',
          subtitle: '',
          description:'',
          isActive: true,
          message: '',
          file: '',
          adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        }; 
        this.onEditorChange = this.onEditorChange.bind( this );       
    }  
    toggleChange = () => {
        this.setState({
            isActive: !this.state.isActive,
        });
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;

        if(e.target.name === 'title'){
            const modified_slug = e.target.value.replace(/\s+/g, '-').toLowerCase();
            state['blogname'] = modified_slug;
        }
        this.setState(state);
    }
    onEditorChange( evt ) {
        this.setState( {
            description: evt.editor.getData()
        } );
    }
    onChangeHandler=event=>{
        this.setState({
            file: event.target.files[0],
          loaded: 0,
        })
      }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(!this.state.file){
            formData.append('blogimage','');
        } else {
            formData.append('blogimage',this.state.file); 
        }
        formData.append('blogname',this.state.blogname);
        formData.append('title',this.state.title);
        formData.append('subtitle',this.state.subtitle);
        formData.append('description',this.state.description);
        formData.append('isActive',this.state.isActive);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(this.state.file);
        var loginuserid = this.state.adminLoginUser._id;
        var url = 'http://localhost:3001/api/'+loginuserid+'/addblog';
        
        axios.post(url, formData, config)
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('./blog-manage');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { title, blogname, subtitle, description, isActive, message} = this.state;
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-addblog" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">New Blog</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={title} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. bolg-slug" name="blogname" value={blogname} onChange={this.onChange} required/>

                <label htmlFor="inputEmail">Sub Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Sub title" name="subtitle" value={subtitle} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Description</label>
                
                <CKEditor
                    data={description}
                    onChange={this.onEditorChange}
                    type="classic"
                    required                    
                />
                <br/>
                <label htmlFor="inputEmail">Publish or not?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="isActive" value={isActive} checked={this.state.isActive} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                <br/>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <br/><br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="./blog-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Addnewblog;