"use strict";
var Login = React.createClass({
    getInitialState: function() {
		return {
			currentUser: true,
			Email: '',
			Password: '',
			errorMessage: ''
		};
    },
	
	componentDidMount: function() {
		var self = this;
		
		this.oauthInit();
		
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '1687096358206984',
				cookie     : true,  // enable cookies to allow the server to access the session
				xfbml      : true,  // parse social plugins on this page
				version    : 'v2.1' // use version 2.1
			});
			
			FB.Event.subscribe('auth.login', function(response) {
		        self.checkLoginState()
		    });

		    FB.Event.subscribe('auth.logout', function(response) {
		        self.checkLoginState()
		    });   
			
			FB.getLoginStatus(function(response) {
				this.statusChangeCallback(response);
			}.bind(this));
		}.bind(this);
			
		// Load the SDK asynchronously
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	
	
	/////// BEGIN Google+ login
	oauthInit: function() {		
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 250,
			'height': 45,
			'longtitle': true,
			'theme': 'light',
			'onsuccess': this.onSignIn
		});		
	},
	
	onSignIn: function(googleUser) {
		let profile = googleUser.getBasicProfile();
		console.log('Successful login for: ' + profile.getName);
		console.log(JSON.stringify(profile, null, 2));
		
		this.upsertUser({ 
			UserName: profile.getEmail()
		});
	},
	/////// END Google+ login
	
	/////// BEGIN Facebook login 
	fbLoginClick: function() {
		FB.login();
	},
	
	checkLoginState: function() {
		FB.getLoginStatus(function(response) {
			this.statusChangeCallback(response);
		}.bind(this));
	},
	
	statusChangeCallback: function(response) {
		var self = this;
		console.log('response.status = ' + response.status);
		if (response.status === 'connected') {
			console.log('Welcome!  Fetching your information.... ');
			FB.api('me?fields=id,name,first_name,last_name,email,picture,friends', function(response) {
				console.log('Successful login for: ' + response.name);
				console.log(JSON.stringify(response, null, 2));

				self.upsertUser({ 
					//FirstName: response.first_name, 
					//LastName: response.last_name, 
					UserName: response.email
				});
			}); 
		} 
	},
	/////// END Facebook login  
	
	/////// BEGIN Upsert User with successful Facebook or Google sign in
	upsertUser: function(user) {
		var self = this,
			cleanEmail = encodeURIComponent(user.Email);
			auth = $('#tokenType').val() + ' ' + $('#token').val();

        $.ajax({
            type: 'GET', // rest verb (GET, POST, PUT, DEL)
            url: this.context.baseAPI + '/api/account/test',
            headers: { 'Authorization': auth },
            dataType: 'json',
            success: function (response) {
				console.log('success!');
				console.log(JSON.stringify(response, null, 2));
				this.setState({ 
					currentUser: true
				});
				self.handleCommitSubmit(response);
            },
			error: function(response) {
				console.log(JSON.stringify(response, null, 2));
				self.handleCommitSubmit(response);
            }
        })
	},
	/////// END Upsert User
	
	/////// BEGIN Registration Form  
	handleClick: function(currentUser) {
		console.log('currentUser = ' + currentUser);
		this.setState({ 
			currentUser: currentUser
		});
	},

    handleEmailChange: function(e) {
        this.setState({
			Email: e.target.value
		});
    },
	
    handlePasswordChange: function(e) {
        this.setState({
			Password:e.target.value
		});
    },

    handleConfirmPasswordChange: function(e) {
        this.setState({
			ConfirmPassword:e.target.value
		});
    },

	handleSubmit: function(e) {
	    e.preventDefault();
		var self = this,
			currentUser = this.state.currentUser,
			Email = this.state.Email,
			Password = this.state.Password,
			ConfirmPassword = this.state.ConfirmPassword,
			errorMessage = '';

        var data = "grant_type=password&username=" + Email + "&password=" + Password;
		
		if(currentUser) {
		   	this.handleCommitSubmit(data);
		} else {
            stemApi.register({
                request: {
                    userName: Email,
                    password: Password,
                    confirmPassword: ConfirmPassword
                },
				success: function(response) {
					console.log('success!');
					console.log(JSON.stringify(response, null, 2));
		   			self.handleCommitSubmit(data);
				},
	            error: function (response) {
					console.error(JSON.stringify(response, null, 2));
					if(response.responseJSON.modelState["request.UserName"] != null) {
						errorMessage = response.responseJSON.modelState["request.UserName"];
					}
					if(response.responseJSON.modelState["request.Password"] != null) {
						errorMessage += response.responseJSON.modelState["request.Password"];
					}
					if(response.responseJSON.modelState["request.ConfirmPassword"] != null) {
						errorMessage += response.responseJSON.modelState["request.ConfirmPassword"];
					}
	                self.setErrorMessage(errorMessage);
	            }
            });
		}
	},
	
	handleCommitSubmit: function(data) {
		var self = this;

        stemApi.login({
            request: {
                form: $("#loginForm")
            },
            success: function (response) {
				console.log('success!');
				console.log(JSON.stringify(response, null, 2));
				self.getAccountInfo(response.token_type, response.access_token);
            },
            error: function (response) {
				console.log(JSON.stringify(response, null, 2));
                self.setErrorMessage(response.responseJSON.error_description);
            }
        });
	},

	setErrorMessage: function(message) {
        this.setState({
        	errorMessage: message
        });
        console.error('message = ' + message)
	},
	/////// END Registration Form

	getAccountInfo: function(tokenType, token) {
		var self = this;

		stemApi.setAuth(tokenType, token);
		stemApi.getAccount({
            success: function (response) {
                console.log('success!');
				console.log(JSON.stringify(response, null, 2));
				var page = 100;
				if (response.accountType == 'Artist') {
					page = 6;
				} else if (response.accountType == 'Creator') {
					page = 10;
				} else if (response.accountType == 'Admin') {
					page = 20;
				}
				self.updateLoginStatus(true, response, page);	
            },
            error: function (response) { 
            	console.error(JSON.stringify(response, null, 2));
				self.updateLoginStatus(true, null, 100);
             }
        });
	},

    updateLoginStatus: function(isLoggedIn, userInfo, currentPage) {
		//FB.logout();

		store.dispatch((dispatch) => {
			dispatch({
				type: 'UpdateLoginStatus',
				data: {
					isLoggedIn: isLoggedIn,
					userInfo: userInfo
				}
			});

	    	dispatch({
	        	type: 'GoToPage',
	        	data: {currentPage: currentPage}
	    	});
		})
    },

//					<a onClick={self.updateLoginStatus(false)}>Logout</a>
	render: function() {
		var self = this;
		
		return (	
			<div className={this.props.isLoggedIn ? "display-false" : "display-true text-center"}>
				<div id="bg">
					<img src="assets/images/handandfader.jpg" alt="" />
				</div>
				<div className="login-form">
					<div className="form-tabs">
						<span className={this.state.currentUser ? "active" : null}>
							<a className="secondary" onClick={this.handleClick.bind(self, true)}>Login</a>
						</span>
						<span className={this.state.currentUser ? null : "active"}>
							<a className="secondary" onClick={this.handleClick.bind(self, false)}><i className="icon-plus"></i> Create Account</a>
						</span>
					</div>	
					<div className="form-bg"></div>
					<div className="form-content">
						{this.state.currentUser ? 
							<h3>Sign In</h3>
						:
							<h3>Sign Up</h3>
						}
						<span className="spacer"></span>

						<form id="loginForm">						
							<div className="btn-wide abcRioButton abcRioButtonLightBlue" onClick={this.fbLoginClick}>
								<div className="abcRioButtonContentWrapper">
									<div className="abcRioButtonIcon">
										<div className="icon">
											<span className="fa fa-facebook" />
										</div>
									</div>
									<span className="abcRioButtonContents">
										<span>Sign in with Facebook</span>
									</span>
								</div>
							</div>
							<div className="btn-wide" id="g-signin2" data-onsuccess={this.onSignIn} />
							<span className="spacer">
								<h4>or</h4>	
							</span>
							<input name="grant_type" type="hidden" value="password" />

							<input name="username" type="email" className="form-input" value={this.state.Email} onChange={this.handleEmailChange} placeholder="Email..." />
						
							<input name="password" type="password" className="form-input" value={this.state.Password} onChange={this.handlePasswordChange} placeholder="Password..." />
							
							{!this.state.currentUser ? 
								<input name="confirmPassword" type="password" className="form-input" value={this.state.ConfirmPassword} onChange={this.handleConfirmPasswordChange} placeholder="Confirm Password..." />
							: null }
							
							{ this.state.errorMessage != '' ?
								<span className="error">{this.state.errorMessage}</span>
							: null }
							
							<button onClick={this.handleSubmit} className="btn btn-wide btn-primary">
								{ this.state.currentUser ?
									<span>Login to Stem</span>
								:
									<span>Create Account</span>
								}
							</button>
						</form>
						
						<div id="fstatus"/>
						<div id="gstatus"/>
					</div>
				</div>
			</div>
		);
	}
});

Login.contextTypes = {
	baseAPI: React.PropTypes.string
};