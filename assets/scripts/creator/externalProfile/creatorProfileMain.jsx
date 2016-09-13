var CreatorProfileMain = ReactRedux.connect(function(state) {
  return {
    // creatorIdExt: state.appState.pageParams
  };
})(React.createClass({
  getInitialState: function() {
    return {
      songs: []
    };     
  },
  componentDidMount: function() {
    stemApi.getCreatorProfile({
      creatorId: this.props.creator.id
    })
    .then(function(response) {
      this.setState({songs: response});
    }.bind(this))
    .catch(function(error) {
      console.log('Creator Profile Error: ' + JSON.stringify(error));
    });
  },
  render: function () {
    return (
      <div>
        <CreatorProfileHeader creator={this.props.creator} />
        <div className="pad-box-lg bg-white">
          <h3>My Latest Videos</h3>
          <a>youtube.com/things</a>
          <CreatorProfileYouTube />
          <CreatorProfileTags />
          <div className="pad-box-md">
            <h3>My Activity</h3>
            <p>My latest plays and loves</p>
          </div>
          <PlaylistTable songs={this.state.songs} />
          <div className="text-center">
            <a><h3>Load More</h3></a>
          </div>  
        </div>  
      </div>
    )
  }
}));

