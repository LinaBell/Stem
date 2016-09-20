var ArtistProfileTable = React.createClass({
	render: function() {
		var songs = this.props.songs

		return (
	  		<div className="artist-table-wrapper bg-white col-xs-12">
				<table>
		  			<PlaylistTable songs={songs} />
				</table>
	  		</div>
		);
	}
});