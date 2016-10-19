var MusicPlayer = ReactRedux.connect((state) => {
	return {
		songId: state.appState.playingSongId
	}
}, (dispatch) => {
	return {
		playSong: function(songId) {
			dispatch({
				type: 'PlaySong',
				data: {
					songId: songId
				}
			})
		}
	}
})(
React.createClass({
	player: null,
	getInitialState: function() {
		return {
			artistName: '',
            songName: '',
            albumArtUrl: '',
            playerVisible: false
        };
	},

	componentDidMount() {
        $( this.refs.draggable ).draggable();

        if (this.props.songId) {
        	this.initializePlayer(this.props.songId)
        }
    },
    componentWillReceiveProps(nextProps) {
    	if (nextProps.songId && nextProps.songId !== this.props.songId) {
    		this.initializePlayer(nextProps.songId);
    	}
    },
    componentWillUnmount() {
    	if (this.player) {
    		this.player.remove();
    	}
    },

	initializePlayer(songId) {

		stemApi.getSong({
			id: songId
		})
		.then((res) => {
			this.setState({
				artistName: res.artistName,
				songName: res.name,
                albumArtUrl: res.albumArtUrl
			})
		})

    	stemApi.streamSong({
    		id: songId
    	})
    	.then((res) => {

    		if (this.player !== null) {
    			this.player.load([{
    				sources: [{
    					file: res.url,
    					type: 'mp3'
    				}]
    			}])
    		} else {
	    		this.player = jwplayer('music-player').setup({
			    	file: res.url,
			    	// A height of 40 puts this in audio mode
			    	height: 40,
			    	width: 485,
			    	type: 'mp3',
			    	autostart: true
				});
			}

    		this.setState({
                playerVisible: true
    		})

    		$('.music-player-wrapper').animate({
				opacity: "1",
				width: "530px",
				height: "170px"
			}, 400);
    	})
	},

    closePlayer: function() {

        if (this.state.playerVisible) {
            $('.music-player-wrapper').animate({
                opacity: '0',
                width: '0',
                height: '0'
            }, 400);
            this.setState({
                playerVisible: false
            });
            
            this.props.playSong(null);
            this.player.stop();

        } else {
            $('.music-player-wrapper').animate({
                opacity: '0',
                width: '0',
                height: '0'
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
    					<div className="mar-t-sm mar-b-sm"></div>
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
}))
