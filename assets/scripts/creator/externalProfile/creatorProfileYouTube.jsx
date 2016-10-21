var CreatorProfileYouTube = React.createClass({
  getInitialState: function() {
    return {
      videos: []
    };
  },
  componentDidMount: function() {
    stemApi.getCreatorProfile({
      creatorId: this.props.creator.id
    })
    .then(function(res) {
      this.setState({ videos: res.latestVideos });
    }.bind(this), function(error) {
      console.error('Creator Video Error: ' + JSON.stringify(error));
    });

  },
  render: function () {
    var videos = this.state.videos;
    return (
      <div className="creator-youtube-wrapper pad-t-lg pad-b-lg">
        <ul className="creator-youtube-list row no-gutters">
        {videos.map((video, index) => {
          return(
            <YoutubeVideoItem key={index} video={video} />
          )
        })}
        </ul>
      </div>
    )
  }
});

var YoutubeVideoItem = React.createClass({
  getInitialState: function() {
    return {
      videoDetails: [],
      videoStatistics: []
    }
  },
  componentDidMount: function() {
    var youtubeKey = 'AIzaSyCZfdWXAhC11UgPUzsbVkcEYbx7zU-J3Ic';
    var youtubeId = this.props.video;
    var youTubeURL = 'https://www.googleapis.com/youtube/v3/videos?id=' + youtubeId + '&key=' + youtubeKey;
    var youTubeURLViewCount = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + youtubeId + '&key=' + youtubeKey; 

    $.ajax({
      method: 'GET',
      url: youTubeURL,
      data: { 
        part: 'snippet',
      },
      dataType: 'json',
      success: function(res) {
        this.setState({ videoDetails: res.items[0].snippet });
      }.bind(this),
      error: function(error) {
        console.error('Youtube API Error: ' + JSON.stringify(error));
      }
    });
    $.ajax({
      method: 'GET',
      url: youTubeURLViewCount,
      data: { 
        part: 'statistics',
      },
      dataType: 'json',
      success: function(res) {
        this.setState({ videoStatistics: res.items[0].statistics.viewCount });
      }.bind(this),
      error: function(error) {
        console.error('Youtube API Error: ' + JSON.stringify(error));
      }
    });
  },
  render: function() {
    var videoEmbed = this.props.video;
    var youTubeURL = 'https://www.youtube.com/embed/' + videoEmbed;

    return(
      <li>
        <iframe className="creator-youtube-video" src={ youTubeURL } frameBorder="0" allowFullScreen></iframe>
        <a><h4>{this.state.videoDetails.title}</h4></a>
        <p>{this.state.videoDetails.channelTitle}</p>
        <p>{this.state.videoStatistics} views</p>
      </li>
    )
  }
});