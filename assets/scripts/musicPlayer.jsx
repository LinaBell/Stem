var MusicPlayer = React.createClass({
	player: null,
	getInitialState: function() {
		return {
			artistName: '',
            songName: '',
            albumArtUrl: '',
            playerVisible: false
        };
	},

    componentWillReceiveProps(nextProps) {

    	if (!nextProps.songId) {
    		this.setState({

                playerVisible: false
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
    				songName: res.name,
                    albumArtUrl: res.albumArtUrl
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
			    	width: 485,
			    	type: 'mp3'
				});

				this.player = player;

		    	this.player.on('playlist', (ev) => {
		    		this.player.play();
		    	})

	    		this.setState({

                    playerVisible: true
	    		})
	    	})
    	}
    },
    componentDidMount: function() {
        $( this.refs.draggable ).draggable();
    },
    componentWillUnmount() {
    	if (this.player) {
    		this.player.remove();
    	}
    },
    closePlayer: function() {

        if (this.state.playerVisible) {
            $('.music-player-wrapper').animate({
                opacity: "0",
                width: "0",
                height: "0"
            }, 400);
            this.setState({
                playerVisible: false
            });
        } else {
            $('.music-player-wrapper').animate({
                opacity: "0",
                width: "0",
                height: "0"
            }, 400);
            this.setState({
                playerVisible: false
            }); 
        }
    },
	render: function() {
		
		return(
			<div ref="draggable" className="ui-widget-content mar-box-md music-player-wrapper bg-white" >
				{ this.state.playerVisible ? 
                <div className="music-player-show di">
                    <img className="display-inlb mobile-img-thumbnail mar-r-md" src={this.state.albumArtUrl} />
                    <div className="player-detail display-inlb">
    					<h3 className="music-player-header display-inlb mar-t-sm">{ this.state.artistName } - { this.state.songName }</h3>
                        <div className="display-inlb pull-right">
                            <span onClick={this.closePlayer} className="icon-cancel cancel-hover"></span>
                        </div>    
    					<div id="waveform" className="mar-t-sm mar-b-sm"></div>
                        <div className="mar-b-sm">
    					    <h4 className="display-inlb">Follow this artist:</h4>
        					<ul className="display-inlb mar-l-md">
                                <li className="icon-spotify"></li>
                                <li className="icon-soundcloud-2"></li>
                                <li className="icon-youtube-1"></li>
                                <li className="icon-facebook-4"></li>
                                <li className="icon-twitter-bird"></li>
                                <li className="icon-instagram-3"></li>
                            </ul>
                        </div> 
                    </div>       
				</div> : null }
				<div id="music-player"></div>
			</div>
		);
	}
})