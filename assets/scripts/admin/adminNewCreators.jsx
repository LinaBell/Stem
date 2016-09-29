var AdminNewCreators = React.createClass({
		getInitialState: function() {
		return{
			creators: []

		}
	},
	componentDidMount: function() {
		stemApi.getCreatorSignups({
			days: 1
    })
    .then(function(res) {
      this.setState({creators: res.creators});
    }.bind(this))
    .catch(function(error) {
      console.log('New Creators Error: ' + Utilities.normalizeError(error));
    });
	},
	onTimespanChange: function(days) {
		stemApi.getCreatorSignups({
			days: days
    })
    .then((res)=> {

    })
	},
	render: function() {
		return(
			<div className="">
				<TimespanSelector onChange={this.onTimespanChange} />
				<h3 className="admin-data-pages-title top-title primary">Creator Sign Ups</h3>
				<div className="admin-data-pages-chart">
				<AdminNewCreatorsChart onChange={this.onTimespanChange} />
				</div>
				<h3 className="admin-data-pages-title display-inlb primary">Creators</h3>
				<h4 className="admin-data-pages-export-link display-inlb secondary">Export All</h4>
				<AdminNewCreatorsTable creators={this.state.creators} />
			</div>
		)
	}
})

