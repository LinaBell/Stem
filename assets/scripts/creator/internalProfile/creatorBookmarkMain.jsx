var CreatorBookmarkMain = ReactRedux.connect(function(state) {
  return {
    creatorId: state.userState.userInfo.id
  };
})(React.createClass({
  getInitialState: function() {
    return {
      songs: []
    }
  },
  componentDidMount: function() {
    stemApi.getCreatorBookmarks({
      creatorId: this.props.creatorId
    })
    .then(function(response) {
      this.setState({ songs: response });
      console.log(this.state.songs, "hi hello");
    }.bind(this), function(error) {
      console.error('Creator Bookmarks Error: ' + JSON.stringify(error));
    });

  },
  render: function() {
    return(
      <div>
        <div className="pad-box-lg">
          <h3>Bookmarks</h3>
          <p>The songs you've liked</p>
        </div>
        {this.state.songs.length <= 0 ? <BookmarksZeroState /> : <PlaylistTable songs={this.state.songs} /> }  
        
      </div>
    )
  }
}));