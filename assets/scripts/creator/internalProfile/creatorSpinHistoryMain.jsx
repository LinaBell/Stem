var CreatorSpinHistoryMain = React.createClass({
  getInitialState: function() {
    return {
      songs: []
    }
  },
  render: function() {
    return(
      <div>
        <div className="pad-box-lg">
          <h3>Spin History</h3>
          <p>The songs you've listened to recently</p>
        </div>
        {this.state.songs.length <= 0 ? <SpinHistoryZeroState /> : <PlaylistTable songs={this.state.songs} /> }  
        
      </div>
    )
  }
});