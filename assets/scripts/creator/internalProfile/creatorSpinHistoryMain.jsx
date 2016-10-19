var CreatorSpinHistoryMain = ReactRedux.connect(function(state) {
  return {
    id: state.userState.userInfo.id,
    spinHistory: state.appState.spinHistory
  };
},
function (dispatch) {
  return {
    beginSpinHistory: function(id) {
      dispatch(beginSpinHistory(id));
    }
  };
}
)(React.createClass({
  componentDidMount: function() {
    this.props.beginSpinHistory(this.props.id);
    console.log(this.props.spinHistory);
  },
  onBookmarkChange: function() {
    this.props.beginSpinHistory(this.props.id)
  },
  render: function() {
    return(
      <div className="content-vh content-padding">
        <div className="pad-b-md">
          <h2>Spin History</h2>
          <p className="font-light">The songs you've listened to recently</p>
        </div>
        <PlaylistTable songs={this.props.spinHistory} onBookmarkChange={this.onBookmarkChange} canToggleBookmarkIcon={false} />  
        
      </div>
    )
  }
}));