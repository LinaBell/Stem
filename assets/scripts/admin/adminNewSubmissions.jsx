var AdminNewSubmissions = React.createClass({
	getInitialState: function() {
		return{
			artist: []

		}
	},
	componentDidMount: function() {
		stemApi.getArtistSubmissions({
			days: 1
	    })
	    .then(function(res) {
	      this.setState({artist: res.songs});
	    }.bind(this))
	    .catch(function(error) {
	      console.log('New Submissions Error: ' + Utilities.normalizeError(error));
	    });
	},
	onTimespanChange: function(days) {
		stemApi.getArtistSubmissions({
			days: days
    })
    .then((res)=> {

	    })
	},
	render: function() {
		return(
			<div className="">
				<TimespanSelector onChange={this.onTimespanChange} />
				<div className="admin-data-pages-chart mar-b-lg">
					<AdminNewSubmissionsChart onChange={this.onTimespanChange} />
				</div>
				<h3 className="admin-data-pages-title display-inlb primary">Songs</h3>
				<h4 className="admin-data-pages-export-link display-inlb secondary">Export All</h4>
				<AdminNewSubmissionsTable artists={this.state.artist} />
			</div>
		)
	}
});