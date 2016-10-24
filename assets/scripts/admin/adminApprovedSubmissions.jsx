var AdminApprovedSubmissions = React.createClass({
	render: function() {
		return(
			<div className="">
				<TimespanSelector onChange={this.onTimespanChange} />
				<div className="admin-data-pages-chart mar-b-lg">
					<AdminApprovedSubmissionsChart onChange={this.onTimespanChange} />
				</div>
				<h3 className="admin-data-pages-title display-inlb primary">Songs</h3>
				<h4 className="admin-data-pages-export-link display-inlb secondary">Export All</h4>
				<AdminApprovedSubmissionsTable artists={this.state.artist} />
			</div>
		)
	}
})