var AdminDashboard = ReactRedux.connect(function(state) {
	return {
		currentPage: state.appState.currentPage
	};
})(React.createClass({
	getInitialState: function() {
		return {
			artistSignUps: [],
			artistSubmissions: [],
			creatorSignUps: [],
		}
	},

	componentDidMount: function() {
		stemApi.getArtistSignups()
		.then(function(res) {
			this.setState({artistSignUps: res.signUps})
		}.bind(this))
		.catch(function(error) {
			console.log('New Artists Error: ' + Utilities.normalizeError(error));
		});

		stemApi.getArtistSubmissions()
		.then(function(res) {
			this.setState({artistSubmissions: res.submissions})
		}.bind(this))
		.catch(function(error) {
			console.log('New Submissions Error: ' + Utilities.normalizeError(error));
		});

		stemApi.getCreatorSignups()
		.then(function(res) {
			this.setState({creatorSignUps: res.signUps})
		}.bind(this))
		.catch(function(error) {
			console.log('New Creators Error: ' + Utilities.normalizeError(error));
		});
	},

	navigate: function(id) {
		store.dispatch({
			type: 'GoToPage',
			data: { currentPage: id }
		});
	},

	render: function() {
		var artistSignUps = this.state.artistSignUps;
		var artistSubmissions = this.state.artistSubmissions;
		var creatorSignUps = this.state.creatorSignUps;

		return(
			<div className="">
				<div className="admin-dashboard">	
					<div className="admin-dashboard-box display-inlb bg-primary pad-box-md" onClick={this.navigate.bind(this, 21)}>
						<span className="icon icon-videocam fa-4x white pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm">{creatorSignUps.count ? creatorSignUps.count : 0}</h2>
						<h2 className="title mar-b-sm">New Creators</h2>
					</div>
					<div className="admin-dashboard-box display-inlb bg-primary pad-box-md" onClick={this.navigate.bind(this, 23.3)}>
						<span className="icon icon-up-circled fa-4x white pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm">{artistSubmissions.count ? artistSubmissions.count : 0}</h2>
						<h2 className="title mar-b-sm">New Submissions</h2>
					</div>
					<div className="admin-dashboard-box display-inlb pad-box-md">
						<span className="icon icon-down-circle fa-4x primary pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm primary">622</h2>
						<h2 className="title mar-b-sm primary">Downloads</h2>
					</div>
					<div className="admin-dashboard-box display-inlb pad-box-md" onClick={this.navigate.bind(this, 22)}>
						<span className="icon icon-headphones-2 fa-4x primary pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm primary">{artistSignUps.count ? artistSignUps.count : 0}</h2>
						<h2 className="title mar-b-sm primary">New Artists</h2>
					</div>
					<div className="admin-dashboard-box display-inlb bg-grey-5 pad-box-md">
						<h2 className="large-toolbox-text primary">ACTIVE CREATORS</h2>
					</div>
					<div className="admin-dashboard-box display-inlb bg-grey-5 pad-box-md">
						<h2 className="large-toolbox-text primary">TOP ARTISTS</h2>
					</div>			
				</div>
			</div>
		)
	}
}));