var PlaylistMain = React.createClass({
	getInitialState: function() {
		return {
			songs: []
		}
	},
    render: function() {
        var self = this;
		
		return (
			<div className="content-vh">
				<PlaylistHeader />
				<PlaylistTable songs={this.state.songs} />
				<PlaylistMobileView />
			</div>	
		);
	}
});
