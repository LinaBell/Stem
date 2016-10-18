var LibraryMainTableRow = ReactRedux.connect(null, function(dispatch) {
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
})(React.createClass({
	edit: function() {
		// TODO: Do the thing where we edit
	},
	render: function() {
		var song = this.props.song;
		
		return (
			<tr>
            	<td className="img-td col-xs-1 row no-gutters">
                	<a onClick={ this.props.playSong.bind(this, song.id) }>
                		<img className="mobile-img-thumbnail mar-r-xs" src={song.albumArtUrl} />
                	</a>
              	</td>
              	<td className="col-xs-1 col-md-2"><p>{song.name}</p></td>
              	<td className="col-xs-1 col-md-2"><p>{song.albumName}</p></td>
              	<td className="col-xs-1"><p>{song.duration}</p></td>
              	<td className="col-xs-1"><p>{song.playCount}</p></td>
              	<td className="col-xs-1"><p>{song.uses}</p></td>
            	<td className="col-xs-1"><p>{song.status}</p></td>
            	<td className="col-xs-1"><p><span onClick={this.edit} className="icon-edit fa-2x"></span></p></td>
            </tr>
		);
	}
}));