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
      <div>
        <div className="pad-box-lg">
          <h3>Bookmarks</h3>
          <p>The songs you've liked</p>
        </div>
        {this.props.creatorBookmarks.length <= 0 ? <BookmarksZeroState /> : 
          <PlaylistTable songs={this.props.creatorBookmarks} onBookmarkChange={this.onBookmarkChange} canToggleBookmarkIcon={false} /> }  
        
      </div>
    )
  }
}));