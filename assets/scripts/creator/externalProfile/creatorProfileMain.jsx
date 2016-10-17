var CreatorProfileMain = React.createClass({
  getInitialState: function() {
    return {
      creator: [],
      songs: []     
    };     
  },
  componentDidMount: function() {
    stemApi.getCreatorProfile({
      creatorId: this.props.creator.id
    })
    .then((res) => {
      this.setState({creator: res, songs: res.activiy });
    }, (error) => {
      console.error('Creator Profile Error: ' + JSON.stringify(error));
    });
  },
  render: function () {
     return (
      <div>
        <CreatorProfileHeader creator={this.props.creator} />
        <div className="pad-box-lg bg-white">
          <h3>My Latest Videos</h3>
          <a>youtube.com/things</a>
          <CreatorProfileYouTube creator={this.props.creator} />
          <CreatorProfileTags creator={this.props.creator} />
          <div className="pad-t-md section-label">
            <h3>My Activity</h3>
            <p>My latest plays and bookmarks</p>
          </div>
          <PlaylistTable songs={this.state.songs} />
          <div className="text-center">
            <a><h3>Load More</h3></a>
          </div>  
        </div>  
      </div>
    )
  }
});
