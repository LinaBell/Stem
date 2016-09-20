var ArtistSearch = ReactRedux.connect(function(state) {
	return {
		searchResults: state.appState.searchResults,
		searchTerms: state.appState.searchTerms
	};
})(React.createClass({
	render: function() {
		return (
			<span>
				<div className="sidebar search-sidebar-tablet">
					<ArtistSearchSideBar />
				</div>
				<div className="content-with-sidebar">
					{ this.props.searchResults.length === 0 && this.props.searchTerms.length > 0 ? 
						<ArtistSearchNoResultsHeader /> : 
						<PlaylistTable songs={this.props.searchResults} />
					}
				</div>  
			</span>
		)
	}
}));