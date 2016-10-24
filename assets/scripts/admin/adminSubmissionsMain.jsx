var AdminSubmissionsMain = React.createClass({
	getInitialState: function() {
		return {
			newSubmissions: true,
			approvedSubmissions: false,
			liveSubmissions: false
		}
	},

	showNewSubmissions: function() {
		if(!this.state.newSubmissions) {
			this.setState({newSubmissions: true});
			this.setState({approvedSubmissions: false});
			this.setState({liveSubmissions: false})
		} else { return }
	},

	showApprovedSubmissions: function() {
		if(!this.state.approvedSubmissions) {
			this.setState({approvedSubmissions: true});
			this.setState({newSubmissions: false});
			this.setState({liveSubmissions: false})
		} else { return }
	},

	showLiveSubmissions: function() {
		if(!this.state.liveSubmissions) {
			this.setState({liveSubmissions: true});
			this.setState({approvedSubmissions: false});
			this.setState({newSubmissions: false})
		} else { return }
	},

	render: function() {
		return(
			<div className="content-vh mar-t-lg">
				<h3 className="admin-data-pages-title top-title primary">Submissions</h3>
				<ul className="submissions-status-selector">
					<li onClick={this.showNewSubmissions}><h4>New</h4></li>
					<li><h4 onClick={this.showApprovedSubmissions}>Approved</h4></li>
					<li><h4 onClick={this.showLiveSubmissions}>Live</h4></li>
				</ul>
				{ this.state.newSubmissions ? <AdminNewSubmissions /> : null }
				{ this.state.approvedSubmissions ? <AdminApprovedSubmissions /> : null }
				{ this.state.liveSubmissions ? <AdminLiveSubmissions /> : null }
			</div>
		)
	}
})