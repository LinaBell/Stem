var ArtistSearch = ReactRedux.connect(function(state) {
	return {
		searchResults: state.appState.searchResults,
		searchTerms: state.appState.searchTerms,
		creatorId: state.userState.userInfo.id
	};
},
function (dispatch) {
  return {
    refreshBookmarks: function(creatorId) {
      dispatch(beginBookmarkRefresh(creatorId));
    }
  };
}
)(React.createClass({
	componentDidMount: function() {
    this.props.refreshBookmarks(this.props.creatorId)
  },
	onBookmarkChange: function() {
    this.props.refreshBookmarks(this.props.creatorId)
  },
	render: function() {
		return (
			<span>
				<div className="sidebar search-sidebar-tablet">
					<ArtistSearchSideBar />
				</div>
				<div className="pad-box-lg">
					{ this.props.searchResults.length === 0 && this.props.searchTerms.length > 0 ? 
						<ArtistSearchNoResultsHeader /> : 
						<PlaylistTable songs={this.props.searchResults} onBookmarkChange={this.onBookmarkChange} canToggleBookmarkIcon={true} />
					}
				</div>  
			</span>
		)
	}
}));