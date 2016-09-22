var CreatorSpinHistoryMain = React.createClass({
  getInitialState: function() {
    return {
      songs: []
    }
  },
  componentDidMount: function() {
    stemApi.getSpinHistory({
      id: this.props.creator.id
    })
    .then(function(res) {
      this.setState( { songs: res } );
    }.bind(this))
    .catch(function(error) {
      console.error('Error occured while fetching spin history: ' + Utilities.normalizeError(error));
    });
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