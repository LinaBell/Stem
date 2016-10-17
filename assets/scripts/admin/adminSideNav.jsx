var AdminSideNav = ReactRedux.connect(function(state) {
	return {
		currentPage: state.appState.currentPage
	};
})(React.createClass({
	navigate: function(id) {
		store.dispatch({
			type: 'GoToPage',
			data: { currentPage: id }
		});
		this.showHideNav();
	},

	showHideNav: function() {
		this.props.showHideNav();
	},

	render: function() {
		return(
			<div className={(this.props.displayAdminNav ? "admin-side-nav-main" : "admin-side-nav-main-hidden")}>
				<nav className="admin-side-nav">
					<span className="admin-cancel icon-cancel fa-3x white" onClick={this.showHideNav}></span>
					<img className="admin-side-nav-image" src="http://static.communitytable.parade.com/wp-content/uploads/2013/11/slowcooker-meatloaf-ftr.jpg?ggnoads=1"></img>
					<div className="admin-nav-items">
						<ul>
							<li className="pad-b-md pad-t-md pad-l-lg" onClick={this.navigate.bind(this, 20)}><h4>Dashboard</h4></li>
							<li className="pad-b-md pad-t-md pad-l-lg"><h4>Creators</h4></li>
							<li className="pad-b-md pad-t-md pad-l-lg"><h4>Artists</h4></li>
							<li className="pad-b-md pad-t-md pad-l-lg"><h4>Music Admin</h4></li>
								<li className="admin-nav-sub-items pad-b-md pad-t-md"><h4>Approved Music</h4></li>
								<li className="admin-nav-sub-items pad-b-md pad-t-md"><h4>Live Music</h4></li>
								<li className="admin-nav-sub-items pad-b-md pad-t-md"><h4>Pending Music</h4></li>
							<li className="pad-b-md pad-t-md pad-l-lg"><h4>Top of...</h4></li>
								<li className="admin-nav-sub-items pad-b-md pad-t-md"><h4>Top Downloads</h4></li>
								<li className="admin-nav-sub-items pad-b-md pad-t-md"><h4>Top Creators</h4></li>
								<li className="admin-nav-sub-items pad-b-md pad-t-md"><h4>Top Artists</h4></li>
							<li className="pad-b-lg pad-t-md pad-l-lg mar-b-lg"><h4>Settings</h4></li>
						</ul>
					</div>
				</nav>
				<div className="modal-background dark-modal-bg"></div>
			</div>
		)

	}
}));