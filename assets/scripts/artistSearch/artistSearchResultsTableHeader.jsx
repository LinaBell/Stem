var ArtistSearchResultsTableHeader = React.createClass({
	render: function() {
		return (
			<thead className="artist-search-results-table-header">
				<tr>
					<th className="artist-search-table-header-items col-xs-3"><h4>Track / Artist</h4></th>
					<th className="artist-search-table-header-items col-xs-2"><h4>butts</h4></th>
					<th className="artist-search-table-header-items col-xs-1 "><h4>Time</h4></th>
					<th className="artist-search-table-header-items col-xs-1"><h4>Spins</h4></th>
					<th className="artist-search-table-header-items col-xs-1 table-icons"><h4>butts</h4></th>
					<th className="artist-search-table-header-items col-xs-1 table-icons"><h4>Download</h4></th>
				</tr>
			</thead> );
	}
});