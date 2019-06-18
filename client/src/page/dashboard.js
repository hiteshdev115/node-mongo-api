import React, { Component } from "react";
 
class Dashboard extends Component {
	
	constructor(props){
		super(props);
		this.checkLoginAdmin();
	}

	checkLoginAdmin(){
		this.state = {
			loginUser: JSON.parse(localStorage.getItem('userdetails')),
			adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
		};
		if(this.state.loginUser === null){
			//open login screen
			console.log('nullll');
			if(this.state.adminLoginUser !== null) {
				console.log('else if');
				this.props.history.push('/admin/dashboard');
			} else {
				console.log('else');
				this.props.history.push('/');
			}
		} else {
			console.log('push else');
			if(this.state.adminLoginUser !== null && window.location.href.indexOf("admin") > -1) {
				this.props.history.push('/admin/dashboard');
			} else {
				this.props.history.push('/login');
			}
			//this.props.history.push('/');
		}
	}



  render() {
    return (  
			<div>  
				<section className="services-area section-gap">
					<div className="container">
									<div className="row d-flex justify-content-center">
											<div className="menu-content  col-lg-7">
													<div className="title text-center">
															<h1 className="mb-10">Dashboard</h1>
															<p>At about this time of year, some months after New Year’s resolutions have been made and kept, or made and neglected.</p>
													</div>
											</div>
									</div>						
						<div className="row">
							<div className="col-lg-4 col-md-6">
								<div className="single-services">
									<span className="lnr lnr-pie-chart"></span>
									<a href="#"><h4>Web Design</h4></a>
									<p>
										“It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.”
									</p>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="single-services">
									<span className="lnr lnr-laptop-phone"></span>
									<a href="#"><h4>Web Development</h4></a>
									<p>
										If you are an entrepreneur, you know that your success cannot depend on the opinions of others. Like the wind, opinions.
									</p>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="single-services">
									<span className="lnr lnr-camera"></span>
									<a href="#"><h4>Photography</h4></a>
									<p>
										Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills.
									</p>
								</div>	
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="single-services">
									<span className="lnr lnr-picture"></span>
									<a href="#"><h4>Clipping Path</h4></a>
									<p>
										Hypnosis quit smoking methods maintain caused quite a stir in the medical world over the last two decades. There is a lot of argument.
									</p>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="single-services">
									<span className="lnr lnr-tablet"></span>
									<a href="#"><h4>Apps Interface</h4></a>
									<p>
										Do you sometimes have the feeling that you’re running into the same obstacles over and over again? Many of my conflicts.
									</p>
								</div>
							</div>
							<div className="col-lg-4 col-md-6">
								<div className="single-services">
									<span className="lnr lnr-rocket"></span>
									<a href="#"><h4>Graphic Design</h4></a>
									<p>
										You’ve heard the expression, “Just believe it and it will come.” Well, technically, that is true, however, ‘believing’ is not just thinking that.
									</p>
								</div>				
							</div>														
						</div>
					</div>	
				</section>
			</div> 
    )
  }
}
 
export default Dashboard;