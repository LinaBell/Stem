var MusicPlayer = React.createClass({
	player: null,
	getInitialState: function() {
		return {
			canPlay: false
		};
	},

    componentWillReceiveProps(nextProps) {

    	var isUnitialized = (this.player === null);

    	if (isUnitialized || this.props.songId !== nextProps.songId) {
	    	stemApi.streamSong({
	    		id: nextProps.songId
	    	})
	    	.then((res) => {

	    		if (isUnitialized) {
		    		var player = jwplayer('music-player').setup({
				    	file: res.url,
				    	// A height of 40 puts this in audio mode
				    	height: 40,
				    	width: 500,
				    	type: 'mp3'
					});

					this.player = player;
		    	} else {
		    		this.player.load(res.url);
		    	} 

	    		this.setState({
	    			canPlay: true
	    		})
	    	})
    	}
    },

    componentWillUnmount() {
    	this.player.remove();
    },

	render: function() {
		
		return(
			<div className="promo-song-info">
                <div className="right-side-content">
					<h2 className="mar-t-sm">InMemory - Never forget</h2>
					<div id="waveform" className="mar-t-sm mar-b-sm"></div>
					<h3 className="display-inlb">Follow this artist:</h3>
					<FollowThisArtistLinks />
					<div id="music-player"></div>
				</div>
			</div>
		);
	}
})