var ArtistSearchResultsTable = React.createClass({
	render: function() {
	return (
		<div className="artist-search-table-wrapper mar-t-lg">
	    	<table className="col-xs-12 col-md-12 col-lg-11">
	        	<ArtistSearchResultsTableHeader />
	        	<tbody>
	        		{this.props.songs.map(function(song, index) {
						return (
							<PlaylistTable key={index} songs={song} />
						);
					})}
	        	</tbody>
	      	</table>
	  	</div>
		);
	}
});