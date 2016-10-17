var MusicPlayer = React.createClass({
	player: null,
	getInitialState: function() {
		return {
			canPlay: false,
			artistName: '',
			songName: ''
		};
	},

    componentWillReceiveProps(nextProps) {

    	if (!nextProps.songId) {
    		this.setState({
    			canPlay: false
    		})

    		return
    	}

    	var isInitialized = this.player !== null;

    	// HACK: Tearing down each time the song changes can't be good for performance but otherwise can't get the track to change
    	if (isInitialized) {
    		this.player.remove();
    	}

    	if (isInitialized || this.props.songId !== nextProps.songId) {
    		stemApi.getSong({
    			id: nextProps.songId
    		})
    		.then((res) => {
    			this.setState({
    				artistName: res.artistName,
    				songName: res.name
    			})
    		})

	    	stemApi.streamSong({
	    		id: nextProps.songId
	    	})
	    	.then((res) => {
	    		// HACK: We setup the jwplayer each time the song is changed (including tearing it down causing an ugly flicker)
	    		// this should definitely be changed, but is the best solution I could find at the moment
	    		var player = jwplayer('music-player').setup({
			    	file: res.url,
			    	// A height of 40 puts this in audio mode
			    	height: 40,
			    	width: 500,
			    	type: 'mp3'
				});

				this.player = player;

		    	this.player.on('playlist', (ev) => {
		    		this.player.play();
		    	})

	    		this.setState({
	    			canPlay: true
	    		})
	    	})
    	}
    },

    componentWillUnmount() {
    	if (this.player) {
    		this.player.remove();
    	}
    },

	render: function() {
		
		return(
			<div className="promo-song-info">
				{ this.state.canPlay ? 
                <div className="right-side-content">
					<h2 className="mar-t-sm">{ this.state.artistName } - { this.state.songName }</h2>
					<div id="waveform" className="mar-t-sm mar-b-sm"></div>
					<h3 className="display-inlb">Follow this artist:</h3>
					<FollowThisArtistLinks />
				</div> : null }
				<div id="music-player"></div>
			</div>
		);
	}
})