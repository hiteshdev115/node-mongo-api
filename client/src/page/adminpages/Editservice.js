import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';

class Editservice extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeServicename = this.onChangeServicename.bind(this);
        this.onEditorChange = this.onEditorChange.bind( this );    
        
        this.state = {
            id:'',
            title: '',
            servicesname: '',
            description: '',
            isActive: true,
            message: '',
            file: null,
            serviceimage:'',
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };   
        
        
    }

    componentDidMount(){
        const { match: {params} } = this.props;
        var url = 'http://localhost:3001/api/getSingleService/';
        axios.get(url+`${params.serviceid}`)
        .then(response => {
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                servicesname: response.data.servicesname,
                description: response.data.description,
                serviceimage:response.data.serviceimage });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    unlinkThumb = () => {
        console.log('===Remove Thumb Action==>'+this.state.id);
        var url = 'http://localhost:3001/api/service/removethumb/';
        axios.post(url, {id:this.state.id})
        .then(response => {
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                servicesname: response.data.servicesname,
                description: response.data.description,
                serviceimage:'' });
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
        
        const modified_slug = e.target.value.replace(/\s+/g, '-').toLowerCase();
        //this.setState['servicesname'] = modified_slug;
        this.setState({
            servicesname: modified_slug
          });
    }
    onChangeServicename(e) {
        this.setState({
          servicesame: e.target.value
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
        console.log(`${params.serviceid}`);
        e.preventDefault();
        const formData = new FormData();
        
        if(!this.state.file){
            //console.log(this.state.blogimage);
            formData.append('serviceimage',this.state.serviceimage);
        } else {
            //console.log('file');
            formData.append('serviceimage',this.state.file);
        }        
        formData.append('servicesname',this.state.servicesname);
        formData.append('title',this.state.title);
        formData.append('description',this.state.description);
        formData.append('isActive',this.state.isActive);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        var loginuseid = this.state.adminLoginUser._id;
        var url = 'http://localhost:3001/api/'+loginuseid+'/updateservice/';
        
        axios.put(url+`${params.serviceid}`, formData, config)
          .then((result) => {
                this.setState({ message: '' });
                this.props.history.push('../../service-manage');
            })
          .catch((error) => {
            //console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { serviceimage, isActive, message} = this.state;
        
        let imageDisp = [];
        if(serviceimage === ''){
            imageDisp.push(
                <input key="12" type="file" name="file" value={serviceimage} onChange={this.onChangeHandler}/>
            )
        } else {
            imageDisp.push(
                <div key="imagecontain">
                    <img src={"/images/"+serviceimage} width="200" alt={serviceimage} title={serviceimage}></img>
                    <input type="hidden" name="file" value={serviceimage} />
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
                <h2 className="mb-10">Edit Service</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. bolg-slug" name="servicesname" value={this.state.servicesname} onChange={this.onChangeServicename} required/>
                
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
                <a href="../../service-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editservice;