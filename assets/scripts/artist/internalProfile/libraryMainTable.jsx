var LibraryMainTable = React.createClass({
	render: function() {
		var rows = this.props.songs.map(function(song, index) {
			return (
				<LibraryMainTableRow key={index} song={song} />
			);
		});
		return(
	  		<div className="library-result-table tables-page mar-t-lg">
	    		<table className="table no-borders">
	      			<LibraryMainTableHeader />
	      			<tbody>
	     				{rows}
	      			</tbody>
	    		</table>
	  		</div>
		)
	}
});