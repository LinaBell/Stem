var CreatorDownloadsCard = ReactRedux.connect(null, function(dispatch) {
	return {
		playSong(songId) {
			dispatch({
				type: 'PlaySong',
				data: {
					songId: songId
				}
			})
		}
	}
})
(React.createClass({
	render: function() {
		var download = this.props.download;
		return(
			<div className="creator-downloaded-songs">
				<li className="downloaded-individual-song">
					<a onClick={ this.props.playSong.bind(this, download.songId) }>
						<img className="downloaded-song-img display-inlb" src={download.albumArtUrl}></img>
					</a>
					<ul className="downloaded-song-details display-inlb">
						<li className="downloaded-song-title">
							<h4 className="title font-light light-grey mar-b-sm">Song Title</h4>
							<h4 className="color-grey">{download.songName}</h4>
						</li>
						<li className="downloaded-song-artist">
							<h4 className="title font-light light-grey mar-b-sm">Artist</h4>
							<h4 className="color-grey">{download.artistName}</h4>
						</li>
						<li className="downloaded-song-promo-link">
							<h4 className="title font-light light-grey mar-b-sm">Promotion Link</h4>
							<a className="secondary"><h4 className="font-light">http://thmtc.co/6622sojdbcccswipeit</h4></a>
						</li>
						<li className="downloaded-song-extras">
							<h4 className="title font-light light-grey mar-b-sm">Download Extras</h4>
							<ul className="font-light">
								<a className="primary" download="" href={download.albumArtUrl}><li>Album Art</li></a>
								<a className="primary"><li>Lyrics</li></a>
								<a className="primary"><li>Song File</li></a>
								<a className="primary"><li>License</li></a>
							</ul>
						</li>
					</ul>
				</li>
			</div>
		)
	}
}));