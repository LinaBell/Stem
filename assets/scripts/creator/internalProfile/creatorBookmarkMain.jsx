var CreatorBookmarkMain = ReactRedux.connect(function(state) {
  return {
    creatorId: state.userState.userInfo.id,
    creatorBookmarks: state.appState.creatorBookmarks

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
    return(
      <div className="content-vh content-padding">
        <div className="tables-page pad-b-md">
          <h2>Bookmarks</h2>
          <p className="font-light">The songs you've liked</p>
        </div>
        {this.props.creatorBookmarks.length <= 0 ? <BookmarksZeroState /> : 
          <PlaylistTable songs={this.props.creatorBookmarks} onBookmarkChange={this.onBookmarkChange} canToggleBookmarkIcon={false} /> }  
        
      </div>
    )
  }
}));