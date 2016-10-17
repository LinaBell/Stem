var CreatorDownloadsMain = ReactRedux.connect(function(state) {
	return {
		creatorId: state.userState.userInfo.id
	};
})(React.createClass({
	getInitialState: function () {
		return{
			downloads: []
		};
	},
	componentDidMount: function() {
		stemApi.getCreatorDownloads({
			creatorId: this.props.creatorId
		})
		.then(function(response) {
			this.setState({downloads: response})
		}.bind(this), function(error) {
			console.error('Creator Downloads Error: ' + JSON.stringify(error));
		}); 
	},
	render: function() {
		return(
			<div className="content-vh content-padding">
				<div className="creator-downloads">
					<header className="creator-downloads-header pad-b-md">
						<h2 className="">Downloads</h2>
						<p className="font-light">Your history of downloads</p>
					</header>
					<div className="creator-downloads-content">
						{this.state.downloads.length <= 0 ? <CreatorDownloadsZeroState /> : <CreatorDownloadsMap downloads={this.state.downloads} />
						
					}
					</div>
				</div>
			</div>
		)
	}
}));

var CreatorDownloadsMap = React.createClass({
	render: function() {
		return(
			<div>
				{this.props.downloads.map(function(download, index) {
					return(
						<ul className="main-creator-downloads-list">
							<CreatorDownloadsCard key={index} download={download} />
						</ul>
					);
				})}
			</div>
		)
	}
});