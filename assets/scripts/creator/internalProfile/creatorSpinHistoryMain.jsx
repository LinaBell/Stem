var CreatorSpinHistoryMain = React.createClass({
  getInitialState: function() {
    return {
      songs: []
    }
  },
  render: function() {
    return(
      <div>
        <div className="tables-page pad-box-lg">
          <h2>Spin History</h2>
          <p className="font-light">The songs you've listened to recently</p>
        </div>
        {this.state.songs.length <= 0 ? <SpinHistoryZeroState /> : <PlaylistTable songs={this.state.songs} /> }  
        
      </div>
    )
  }
});