import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';

class Editblog extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBlogname = this.onChangeBlogname.bind(this);
        this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
        this.onEditorChange = this.onEditorChange.bind( this );    
        
        this.state = {
            id:'',
            title: '',
            blogname: '',
            subtitle: '',
            description: '',
            isActive: true,
            message: '',
            file: null,
            blogimage:'',
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };   
        
        
    }

    componentDidMount(){
        const { match: {params} } = this.props;
        //console.log(this.props);
        //console.log(`${params.blogid}`);
        var url = 'http://localhost:3001/api/getSingleblog/';
        axios.get(url+`${params.blogid}`)
        .then(response => {
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                blogname: response.data.blogname,
                subtitle: response.data.subtitle,
                description: response.data.description,
                blogimage:response.data.blogimage
                //file:response.data.blogimage
             });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    unlinkThumb = () => {
        console.log('===Remove Thumb Action==>'+this.state.id);
        var url = 'http://localhost:3001/api/removethumb/';
        axios.post(url, {id:this.state.id})
        .then(response => {
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                blogname: response.data.blogname,
                subtitle: response.data.subtitle,
                description: response.data.description,
                blogimage:'' });
        })
        .catch(error => this.setState({ error }));
    }
    
    toggleChange = () => {
        this.setState({
            isActive: !this.state.isActive,
        });
    }
    
    onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
        if(e.target.name === 'title'){
            const modified_slug = e.target.value.replace(/\s+/g, '-').toLowerCase();
            this.setState({
                blogname: modified_slug
            });
        }
    }
    onChangeBlogname(e) {
        this.setState({
          blogname: e.target.value
        });
    }
    onChangeSubtitle(e) {
        this.setState({
            subtitle: e.target.value
        });
    }
    onEditorChange(e) {
        this.setState({
          description: e.editor.getData()
        });
    }
    
     onChangeHandler=event=>{
        this.setState({
            file: event.target.files[0]
        })
      }

    onSubmit = (e) => {
        const { match: {params} } = this.props;
        console.log(`${params.blogid}`);

        var loginuseid = this.state.adminLoginUser._id;
        var url = '';

        e.preventDefault();
        const formData = new FormData();
        //console.log('===>'+this.state.file+this.state.blogimage);

        if(this.state.file === null){
            formData.append('blogimage',this.state.blogimage);
            url = 'http://localhost:3001/api/'+loginuseid+'/editblog/';
        } else {
            formData.append('blogimage',this.state.file);
            url = 'http://localhost:3001/api/'+loginuseid+'/updateblog/';
        } 
        console.log(this.state.file);
        console.log('===='+this.state.blogimage);       
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
        
        axios.put(url+`${params.blogid}`, formData, config)
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('../blog-manage');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { blogimage, isActive, message} = this.state;
        
        let imageDisp = [];
        if(blogimage === ''){
            imageDisp.push(
                <input key="12" type="file" name="file" value={blogimage} onChange={this.onChangeHandler}/>
            )
        } else {
            imageDisp.push(
                <div key="imagecontain">
                    <img src={"/images/"+blogimage} width="200" alt={blogimage} title={blogimage}></img>
                    <input type="hidden" name="file" value={blogimage} />
                    <br/>
                    <a className="genric-btn default-border circle" onClick={this.unlinkThumb}>Remove Blog Featured Image</a>
                </div>
            )
        }
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-signin" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">Edit Blog</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. bolg-slug" name="blogname" value={this.state.blogname} onChange={this.onChangeBlogname} required/>

                <label htmlFor="inputEmail">Sub Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Sub title" name="subtitle" value={this.state.subtitle} onChange={this.onChangeSubtitle} required/>
                
                <label htmlFor="inputEmail">Description</label>
                
                <CKEditor
                    data={this.state.description}
                    onChange={this.onEditorChange}
                    type="classic"
                    required                    
                />
                <br/>
                <label htmlFor="inputEmail">Publish or not?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="isActive" value={isActive} checked={isActive} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                <br/>
                {imageDisp}
                <br/> <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="../blog-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editblog;