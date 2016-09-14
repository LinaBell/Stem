var ArtistAccountNavBar = React.createClass({
	getInitialState: function() {
		return {
			visible: false
		}
	},

	handleNavBarMobile: function() {
		if( this.state.visible == false ) {
			this.setState({visible: true});
		} else {
			this.setState({visible:false});
		}
	},

	render: function() {
		return (
			<div className="sidebar artist-account-navbar-wrapper">
				<div className="sidebar-hide">
					<ul className="mar-t-lg">
						<a onClick=""><li className="col-xs-12"><h5>Account</h5></li></a>
						<a onClick=""><li className="col-xs-12"><h5>Contact Info</h5></li></a>
						<a onClick=""><li className="col-xs-12"><h5>Connected Accounts</h5></li></a>
						<a onClick=""><li className="col-xs-12"><h5>Notifications</h5></li></a>
						<a onClick=""><li className="col-xs-12"><h5>Password</h5></li></a>
					</ul>
				</div>
				<div className="settings-mobile-nav">
					<h3 onClick={this.handleNavBarMobile}> Account <span className={(this.state.visible ? "icon-up-open  pull-right" : "icon-down-open pull-right")}></span></h3>
					{ this.state.visible ? <MobileNavBar /> : null}
				</div>
			</div>
		);
	}
});

var MobileNavBar = React.createClass({
	getInitialState: function() {
		return {
			currentNavItem: ['Accounts', 'Contact Info', 'Connected Accounts', 'Notifications', 'Password']
		}
	},
	handleNavBarItem: function(e) {
		this.setState({currentNavItem: e.target.value});
		console.log(e.target.state);
	},
	render: function() {
		return(
			<div className="settings-mobile-nav">
				<ul className="artist-account-navbar-wrapper">
						{this.state.currentNavItem.map(function(i) {
							return <li className="col-xs-12" onClick={this.handleNavBarMobile}>{i}</li>;
						})}
					</ul>
			</div>
		)
	}
});     
