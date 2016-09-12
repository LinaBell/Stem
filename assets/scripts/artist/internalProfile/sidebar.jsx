var ArtistInternalSideBar = ReactRedux.connect(function(state) {
	return {
		artistId: state.userState.userInfo.id
	};
})(React.createClass({
	getInitialState: function () {
		return {
			dashboardData: {
				topInterests: [],
				topRegions: []
			}
		};
	},
	componentDidMount: function () {
		stemApi.getArtistDashboard({
			artistId: this.props.artistId
		})
		.then(function(response) {
			this.setState({dashboardData: response})
		}.bind(this), function(error) {
			console.error('Artist Dashboard Data Error:' + JSON.stringify(error));
		});
	},
  render: function () {
	var dashData = this.state.dashboardData;
	return (
	  <div className="artist-internal-sidebar hide-mobile">
		<div className="artist-internal-sidebar-spin-count pad-t-md pad-b-md pad-l-md">
		  <h3 className="pad-b-md">Spin Count</h3>
		  <p>For the current month</p>
		  <h2 className="primary">{dashData.spinCount}</h2>
		</div>

		<div className="artist-internal-sidebar-pick-ups pad-t-md pad-b-md pad-l-md">
		  <h3 className="pad-b-md">Pick Ups</h3>
		  <p>For the current month</p>
		  <h2 className="primary">{dashData.pickUps}</h2>
		</div>

		<div className="artist-internal-sidebar-top-interests pad-t-md pad-b-md pad-l-md">
		  <h3 className="mar-b-sm">Top Interest</h3>
		  <ul>
			{dashData.topInterests.map(function(topInterest, index) {
				return (
					<li key={index} className="pad-b-sm">
					  <img className="artist-internal-top-interest-img" src={topInterest.imageUrl} />
					  <h4 className="display-inlb mar-l-md">{topInterest.profileName}</h4>
					</li>
				  );	
			})}
		  </ul>
		</div>
		<div className="artist-internal-sidebar-top-regions pad-t-md pad-l-md">
		  <h3 className="pad-b-md">Top Regions</h3>
		  <ul className="">
			{dashData.topRegions.map(function(topRegion, index) {
				return(
					<li key={index} className="pad-b-sm">
					  <h4>{topRegion}</h4>
					</li>
				  );
			})}
		  </ul>
		</div> 
	  </div>
	)
  }
}));