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
						{songs.map(function(songs, index) {
							return (
								<PlaylistItems key={index} songs={songs} />
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

var PlaylistItems = React.createClass({
	navigateToArtist: function(playList) {
		store.dispatch({
			type: 'GoToPage',
			data: {
				currentPage: 110,
				pageParams: {
					artistId: playList.artistId
				}
			}
		});
	},	
	bookmarkSong: function (songID) {
		if (this.props.songs.isBookmarked == false) {
			stemApi.bookmarkSong({
				songID: songID.id
			});
		} else {
			stemApi.unBookmarkSong({
				songID: songID.id
			});
		}
	},
	render: function() {
		var playList = this.props.songs;
		return(
				<tr>
					<td className="playlist-track-artist col-md-3">
						<img className="mobile-img-thumbnail mar-r-md" src={playList.albumArtUrl} />
						<div className="playlist-detail-info">
							<h4>{playList.name}</h4>
							<p><a onClick={this.navigateToArtist.bind(this, playList.id)}>{playList.artistName}</a></p>
						</div> 
					</td>

					<td className="col-md-2">
						<p>{playList.albumName}</p>              
					</td>

					<td className="col-md-1">
						<p>{playList.duration}</p>              
					</td>

					<td className="col-md-1">
						<p>{playList.downloadCount}</p>              
					</td>

					<td className="col-md-1">
						<p>{playList.bookmarkCount} <i className="icon-up-open"></i></p>
					</td>

					<td className="col-md-1">
						<span onClick={this.bookmarkSong.bind(this, playList)} className={ playList.isBookmarked ? "icon-bookmark-2 primary fa-2x" : "icon-bookmark-empty fa-2x"}></span>            
					</td>

					<td className="col-md-1">
						<a className="color-grey" ><span className="icon-down-circled fa-2x"></span></a>
					</td>
				</tr>
		)
	}
});
