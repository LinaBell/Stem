var ArtistProfileTable = React.createClass({
	render: function() {
		var songs = this.props.songs

		return (
	  		<div className="artist-table-wrapper bg-white col-xs-12">
				<PlaylistTable songs={songs} />
	  		</div>
		);
	}
});