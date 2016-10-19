var CreatorSpinHistoryMain = ReactRedux.connect(function(state) {
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
  getInitialState: function() {
    return {
      songs: []
    }
  },
  componentDidMount: function() {
    stemApi.getSpinHistory({
      id: this.props.creator.id
    })
    .then((response) => {
      this.setState({songs: response})
    })
    .catch((reason) => {
      console.error('Spin History Error: ' + Utilities.normalizeError(reason));
    });
  },
  refreshSpinHistory: function() {
    stemApi.getSpinHistory({
      id: this.props.creator.id
    })
    .then((response) => {
    debugger;
      this.setState({songs: response})
    })
    .catch((reason) => {
      console.error('Spin History Error: ' + Utilities.normalizeError(reason));
    });
  },
  onBookmarkChange: function() {
    this.props.refreshBookmarks(this.props.creatorId);
    this.refreshSpinHistory();
  },
  render: function() {
    return(
      <div className="content-vh content-padding">
        <div className="pad-b-md">
          <h2>Spin History</h2>
          <p className="font-light">The songs you've listened to recently</p>
        </div>
        <PlaylistTable songs={this.state.songs} onBookmarkChange={this.onBookmarkChange} />  
        
      </div>
    )
  }
}));