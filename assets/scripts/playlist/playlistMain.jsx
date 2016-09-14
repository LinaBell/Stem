var PlaylistMain = React.createClass({
	getInitialState: function() {
		return {
			songs: []
		}
	},
    render: function() {
        var self = this;
		
		return (
			<span>
				<PlaylistHeader />
				<PlaylistTable songs={this.state.songs} />
				<PlaylistMobileView />
			</span>	
		);
	}
});
