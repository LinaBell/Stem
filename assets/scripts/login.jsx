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

        stemApi.getProvider({
            request: {
                providerName: 'Facebook'
            },
            success: function (data) {
                console.log(JSON.stringify(data, null, 2));
                self.facebookInit(data.appId);
            },
            error: function (response) {
                console.log(JSON.stringify(response, null, 2));
            }
        });
		
		this.googleInit();
	},
	
	/////// BEGIN Google+ login
	googleInit: function() {		
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 250,
			'height': 45,
			'longtitle': true,
			'theme': 'light',
			'onsuccess': this.onSignIn
		});		
	},
	
	/////// BEGIN Facebook login
	facebookInit: function(appId) {		
		window.fbAsyncInit = function() {
			FB.init({
				appId      : appId,
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
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=" + appId;
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	
	onSignIn: function(googleUser) {
		var profile = googleUser.getBasicProfile(),
			userName = profile.getEmail(),
			authResponse = googleUser.getAuthResponse(),
			id_token = googleUser.getAuthResponse().id_token;

        this.loginExternal(userName, 'Google', id_token);	
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
        console.log(JSON.stringify(response, null, 2));	
		var self = this,
			accessToken = response.authResponse.accessToken;	

		if (response.status === 'connected') {
            FB.api('me?fields=id,name,first_name,last_name,email,picture,friends', function(response) {
                console.log(JSON.stringify(response, null, 2));
                self.loginExternal(response.email, 'Facebook', accessToken);
            });
		} 
	},
	/////// END Facebook login  
	
	/////// BEGIN login with successful Facebook or Google sign in
	loginExternal: function(userName, provider, token) {
    	var self = this;
    	
	    stemApi.loginExternal({
	        request: {
	            provider: provider,
	            externalAccessToken: token
	        },
	        success: function (data) { 
	        	console.log("User Logged in!" + JSON.stringify(data));
				self.getAccountInfo(data.token_type, data.access_token);
	        },
	        error: function (response) {
	            if (response.status = '401') {
	                self.registerExternal(userName, provider, token);
	            }
	        }
	    });
	},
	/////// END loginExternal

	/////// BEGIN auto register if Facebook or Google user not in system
    registerExternal: function(userName, provider, token) {
    	var self = this;

        stemApi.registerExternal({
            request: {
                userName: userName,
                provider: provider,
                externalAccessToken: token
            },
            success: function (data) { 
            	console.log("User Registered. " + JSON.stringify(data));
				self.getAccountInfo(data.token_type, data.access_token);
        	},
            error: function (response) { console.log("Failed to register. " + JSON.stringify(response)) }
        });
    },
	/////// END registerExternal
	
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
				self.goToWhoAreYou();
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

    goToWhoAreYou: function() {
    	store.dispatch({
        	type: 'GoToPage',
        	data: {currentPage: 100}
    	});
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