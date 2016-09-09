var CreatorProfileMain = ReactRedux.connect(function(state) {
  return {
    creatorIdExt: state.appState.pageParams || {}
  };
})(React.createClass({
  getInitialState: function() {
    return {
      creator: {}
    };     
  },
  componentDidMount: function() {

    stemApi.getCreatorProfile({
      creatorId: this.props.creatorId
    })
    .then(function(response) {
      this.setState({creator: response});
    }.bind(this))
    .catch(function(error) {
      console.log('Creator Profile Error: ' + JSON.stringify(error));
    });
  },
  render: function () {
    return (
      <div>
        <CreatorProfileHeader creator={this.props.creatorId} />
        <div className="pad-box-lg bg-white">
          <h3>My Latest Videos</h3>
          <a>youtube.com/things</a>
          <CreatorProfileYouTube />
          <CreatorProfileTags creator={this.props.creatorId} />
          <div className="pad-box-md">
            <h3>My Activity</h3>
            <p>My latest plays and loves</p>
          </div>
          <PlaylistTable />
          <div className="text-center">
            <a><h3>Load More</h3></a>
          </div>  
        </div>  
      </div>
    )
  }
}));

