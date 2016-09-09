var CreatorBookmarkMain = ReactRedux.connect(function(state) {
  return {
    creatorId: state.userState.userInfo.id
  };
})(React.createClass({
  getInitialState: function() {
    return {
      creatorBookmarks: []
    }
  },
  componentDidMount: function() {
    stemApi.getCreatorBookmarks({
      creatorId: this.props.creatorId
    })
    .then(function(response) {
      this.setState({creatorBookmarks: response});
      console.log(this.state.creatorBookmarks);
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
        <PlaylistTable creator={this.state.creatorId} />
      </div>
    )
  }
}));