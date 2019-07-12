import React, { Component } from 'react';

import './App.css';
import "./style.css";


import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";


import HomeComponent from "./page/Home";
import BlogComponent from "./page/Blog";
import ServicesComponent from "./page/Services";
import ContactComponent from "./page/Contact";
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import AdminBlogListComponent from "./page/adminpages/Bloglist";
import AdminAddnewblogComponent from "./page/adminpages/Addnewblog";
import AdminEditlogComponent from "./page/adminpages/Editblog";
import AdminSettingComponent from "./page/adminpages/Setting";

import AdminServiceListComponent from "./page/adminpages/Servicelist";
import AdminAddNewServiceComponent from "./page/adminpages/Addnewservice";
import AdminEditServiceComponent from "./page/adminpages/Editservice";
import AdminServiceDetailsComponent from "./page/Servicedetails";
import AdminBlogDetailsComponent from "./page/Blogdetails";
import AdminContactusComponent from "./page/Contactus";
import AdminContactListComponent from "./page/adminpages/Contactlist";
import AdminSeoListComponent from "./page/adminpages/Seolist";
import AdminAddNewSeoComponent from "./page/adminpages/Addnewseo";
import AdminEditSeoComponent from "./page/adminpages/Editseo";

import AdminProjectListComponent from "./page/adminpages/projectlist";
import AdminAddNewProjectComponent from "./page/adminpages/Addnewproject";
import AdminEditProjectComponent from "./page/adminpages/Editproject";

import AdminDatatableComponent from "./page/adminpages/DatatablePage";

import AdminPortfolioComponent from "./page/Portfolio";

import DashboardComponent from "./page/dashboard";

//import registerServiceWorker from './registerServiceWorkers';
import Login from './page/Login';
import Register from './page/Register';


class App extends Component {
  
  

  render() { 
    
    return (     
      
      <Router>
        <div>
          <HeaderComponent></HeaderComponent>
          
          <Switch>
            <Route exact path='/' component={HomeComponent}></Route>
            <Route exact path='/blog' component={BlogComponent}></Route>
            <Route exact path='/services' component={ServicesComponent}></Route>
            <Route exact path='/contact' component={ContactComponent}></Route>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/contactus/' component={AdminContactusComponent}></Route>

            <Route exact path='/admin/dashboard' component={DashboardComponent}></Route>
            <Route exact path='/admin/blog-manage' component={AdminBlogListComponent}></Route>
            <Route exact path='/admin/addnewblog' component={AdminAddnewblogComponent}></Route>
            <Route exact path='/admin/edit/:blogid' component={AdminEditlogComponent}></Route>
            <Route exact path='/admin/settings' component={AdminSettingComponent}></Route>
            <Route exact path='/admin/demopage' component={AdminDatatableComponent}></Route>
            <Route exact path='/admin/service-manage' component={AdminServiceListComponent}></Route>
            <Route exact path='/admin/addnewservice' component={AdminAddNewServiceComponent}></Route>
            <Route exact path='/admin/service/edit/:serviceid' component={AdminEditServiceComponent}></Route>
            <Route exact path='/admin/contactus-list' component={AdminContactListComponent}></Route>
            <Route exact path='/service/:servicesname' component={AdminServiceDetailsComponent}></Route>
            <Route exact path='/blog/:blogname' component={AdminBlogDetailsComponent}></Route>
            <Route exact path='/admin/seo-manage/' component={AdminSeoListComponent}></Route>
            <Route exact path='/admin/addnewseo/' component={AdminAddNewSeoComponent}></Route>
            <Route exact path='/admin/editseo/:seoid' component={AdminEditSeoComponent}></Route>
            <Route exact path='/admin/project-manage/' component={AdminProjectListComponent}></Route>
            <Route exact path='/admin/addnewproject/' component={AdminAddNewProjectComponent}></Route>     
            <Route exact path='/admin/project/edit/:projectid' component={AdminEditProjectComponent}></Route> 
            <Route exact path='/portfolio' component={AdminPortfolioComponent}></Route>          
     
            
            
            
          </Switch>
          
          <FooterComponent></FooterComponent>
          
        </div>
      </Router>
    );
  }
}

export default App;
