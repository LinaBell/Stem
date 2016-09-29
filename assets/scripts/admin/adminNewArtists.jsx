var AdminNewArtists = React.createClass({
	getInitialState: function() {
		return{
			artist: []

		}
	},
	componentDidMount: function() {
		stemApi.getArtistSignups({
      days: 1
    })
    .then(function(res) {
      this.setState({artist: res.artists});
    }.bind(this))
    .catch(function(error) {
      console.log('New Artist Error: ' + Utilities.normalizeError(error));
    });
	},
	onTimespanChange: function(days) {
		stemApi.getArtistSignups({
			days: days
    })
    .then((res)=> {

    })
	},
	render: function() {
		return(
			<div className="">
				 <TimespanSelector onChange={this.onTimespanChange} />
				<h3 className="admin-data-pages-title top-title pad-t-lg primary">Artist Sign Ups</h3>
				<div className="admin-data-pages-chart">
					<AdminNewArtistsChart onChange={this.onTimespanChange} />
				</div>
				<h3 className="admin-data-pages-title mar-b-lg display-inlb primary">Artists</h3>
				<h4 className="admin-data-pages-export-link display-inlb secondary">Export All</h4>
				<AdminNewArtistsTable artists={this.state.artist} />
			</div>
		)
	}
})

