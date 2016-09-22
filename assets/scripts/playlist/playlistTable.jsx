var PlaylistTable = React.createClass({
	getInitialState: function() {
		return {
			albumId: ''
		}
	},
	testAdminEdit: function() {
		store.dispatch({
			type: 'GoToPage',
			data: {
				currentPage: 105,
				pageParams: {
					albumId: this.state.albumId
				}
			}
		});
	},
	onAlbumIdChange: function(ev) {
		this.setState({
			albumId: ev.target.value
		});
	},
	render: function() {
		var songs = this.props.songs;

		return(
			<div className="playlist-wrapper pad-l-lg pad-r-lg pad-b-lg">
				<table className="col-xs-12 table no-borders">
					<thead>
						<tr>
							<th className="col-md-3 pad-b-md"><h4>Track/Artist</h4></th>
							<th className="col-md-2 pad-b-md"><h4>Album</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Time</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Downloads</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Lift</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Bookmark</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Download</h4></th>
						</tr>	
					</thead>
					<tbody>
						{songs.map((song, index) => {
							return (
									<PlaylistItem key={index} song={song} onBookmarkChange={this.props.onBookmarkChange} canToggleBookmarkIcon={this.props.canToggleBookmarkIcon} />
							)
						})}
					</tbody>
				</table>

				<div>
					<input type="text" value={ this.albumId } onChange={ this.onAlbumIdChange } placeholder="Album Id" />
					<a onClick={ this.testAdminEdit }>Test Admin Edit</a>
				</div>	
			</div>
		)
	}
});

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
	render: function() {
		var song = this.props.song;
		var isBookmarked = song.isBookmarked || !this.props.canToggleBookmarkIcon;

		return(
				<tr>
					<td className="playlist-track-artist col-md-3">
						<img className="mobile-img-thumbnail mar-r-md" src={song.albumArtUrl} />
						<div className="playlist-detail-info">
							<h4>{song.name}</h4>
							<p><a onClick={this.props.navigateToArtist.bind(this, song)}>{song.artistName}</a></p>
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

					<td className="col-md-1">
						<a className="color-grey" ><span className="icon-down-circled fa-2x"></span></a>
					</td>
				</tr>
		)
	}
}));
