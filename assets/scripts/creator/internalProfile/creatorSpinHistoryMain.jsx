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
      <div className="content-vh content-padding">
        <div className="tables-page pad-b-md">
          <h2>Spin History</h2>
          <p className="font-light">The songs you've listened to recently</p>
        </div>
        {this.state.songs.length <= 0 ? <SpinHistoryZeroState /> : <PlaylistTable songs={this.state.songs} /> }  
        
      </div>
    )
  }
});