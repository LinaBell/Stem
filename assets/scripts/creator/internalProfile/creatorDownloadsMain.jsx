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
			<div className="creator-downloads">
				<header className="creator-downloads-header mar-t-lg mar-l-md mar-b-lg">
					<h2 className="mar-b-sm">Downloads</h2>
					<p className="font-light">Your history of downloads</p>
				</header>
				{this.state.downloads.map(function(download, index) {
					return(
						<CreatorDownloadsCard key={index} download={download} />
					);
				})}
			</div>
		)
	}
}));