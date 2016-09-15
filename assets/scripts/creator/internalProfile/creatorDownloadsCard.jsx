var CreatorDownloadsCard = React.createClass({
	render: function() {
		var download = this.props.download;
		return(
			<div className="creator-downloads-songs display-inlb">
				<img className="creator-downloads-song-img display-inlb" src={download.albumArtUrl}></img>
				<div className="creator-downloads-song-info display-inlb pad-l-md pad-t-lg">
					<h2 className="font-light mar-b-lg">{download.artistName}</h2>
					<h3 className="font-bold mar-b-sm">{download.songName}</h3>
					<h5 className="mar-b-md">{download.albumName}</h5>
					<p>Downloaded: {download.downloadDate} <span className="icon-down-circled fa-3x mar-l-md"></span></p>
				</div>
			</div>
		)
	}
});