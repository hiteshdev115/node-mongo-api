import React, { Component } from "react";
import axios from 'axios';

class SeoMeatData extends Component {
  
    
    
    getSeo = () => {
    var cUrl = window.location.href;
    console.log(cUrl);
    const url = 'http://localhost:3001/api/getSingleSeoByName/';
    axios.get(url+encodeURIComponent(cUrl))
    .then(response => { 
        console.log(response.data);
        
    });
    }
  
  render() {
    return(
        <div>
            SeoData
        </div>
    );
  }
}
 
export default SeoMeatData;