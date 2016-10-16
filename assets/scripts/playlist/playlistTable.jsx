var PlaylistTable = ReactRedux.connect(function(state) {
	return {
		userInfo: state.userState.userInfo,
		playingSongId: state.appState.playingSongId
	};
}
)(React.createClass({
	getInitialState: function() {
		return {
			albumId: ''
		}
	},
	onAlbumIdChange: function(ev) {
		this.setState({
			albumId: ev.target.value
		});
	},
	render: function() {
		var songs = this.props.songs;

		return(
			<div className="playlist-wrapper">
				<table className="col-xs-12 table no-borders">
					<thead>
						<tr>
							<th className="col-md-3 pad-b-md"><h4>Track/Artist</h4></th>
							<th className="col-md-2 pad-b-md"><h4>Album</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Time</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Downloads</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Lift</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Bookmark</h4></th>
							{this.props.userInfo.accountType == "Artist" ? null : <th className="col-md-1 pad-b-md"><h4>Download</h4></th>}
						</tr>	
					</thead>
					<tbody>
						{songs.map((song, index) => {
							return (
								<PlaylistItem 
									key={index} 
									song={song} 
									userInfo={this.props.userInfo}
									onBookmarkChange={this.props.onBookmarkChange} 
									canToggleBookmarkIcon={this.props.canToggleBookmarkIcon} />
							)
						})}
					</tbody>
				</table>
				<MusicPlayer songId={ this.props.playingSongId } />
			</div>
		)
	}
}));

var PlaylistItem = ReactRedux.connect(null,
function (dispatch) {
  return {
    navigateToArtist: function(song) {
		dispatch({
			type: 'GoToPage',
			data: {
				currentPage: 110,
				pageParams: {
					artistId: song.artistId
				}
			}
		});
	},
	playSong(songId) {
		dispatch({
			type: 'PlaySong',
			data: {
				songId: songId
			}
		});
	}
  };
}
)(React.createClass({	
	bookmarkSong: function (song) {
		if (song.currentTarget.className == "icon-bookmark-empty fa-2x" ) {
	  		song.currentTarget.className = "icon-bookmark-2 primary fa-2x";
		}
		if (!this.props.song.isBookmarked) {
			stemApi.bookmarkSong({
				song: this.props.song.id
			})
			.then((res) => {
					this.props.onBookmarkChange();
					console.log('bookmarked song');
			})
			.catch((reason) => {
				console.error('Error occurred when adding bookmark: ' + Utilities.normalizeError(reason));
			});
		} else {
			stemApi.unBookmarkSong({
				song: this.props.song.id
			})
			.then((res) => {
					this.props.onBookmarkChange();
					console.log('deleted bookmark');
			})
			.catch((reason) => {
				console.error('Error occurred when removing bookmark: ' + Utilities.normalizeError(reason));
			});	
		}
	},
	playSong() {
		this.props.playSong(this.props.song.id);
	},
	render: function() {
		var song = this.props.song;
		var isBookmarked = song.isBookmarked || !this.props.canToggleBookmarkIcon;

		return(
				<tr>
					<td className="playlist-track-artist col-md-3">
						<div className="col-sm-4">
							<a onClick={ this.playSong }>
								<img className="mobile-img-thumbnail mar-r-md" src={song.albumArtUrl} />
							</a>
						</div>
						<div className="playlist-detail-info col-sm-8">
							<h4>{song.name}</h4>
							<a onClick={this.props.navigateToArtist.bind(this, song)}><p>{song.artistName}</p></a>
						</div> 
					</td>

					<td className="col-md-2">
						<p>{song.albumName}</p>              
					</td>

					<td className="col-md-1">
						<p>{song.duration}</p>              
					</td>

					<td className="col-md-1">
						<p>{song.downloadCount}</p>              
					</td>

					<td className="col-md-1">
						<p>{song.bookmarkCount} <i className="icon-up-open"></i></p>
					</td>
			
					<td className="col-md-1">
						<span onClick={this.bookmarkSong} className={ isBookmarked ? "icon-bookmark-2 primary fa-2x" : "icon-bookmark-empty fa-2x"}></span>            
					</td>

					{ this.props.userInfo.accountType == "Artist" ? null : <td className="col-md-1">
						<a className="color-grey" ><span className="icon-down-circled fa-2x"></span></a>
					</td> }
				</tr>
		)
	}
}));
