var FeaturedArtist = ReactRedux.connect(null,
function (dispatch) {
  return {
    navigateToArtist: function(selectedArtist) {
      dispatch({
        type: 'GoToPage',
        data: {
          currentPage: 110,
          pageParams: {
            artistId: selectedArtist.id
          }
        }
      });
    }
  };
}
)(React.createClass({
  getInitialState: function() {
    return {
      selectedArtist: []
    }
  },
  componentDidMount: function(){
    stemApi.getArtistsPopular({
  
    })
    .then(function(response) {
      this.setState({selectedArtist: response[0]});
    }.bind(this), function(error) {
      console.error('Top Artist Error: ' + JSON.stringify(error));
    });
  },
  onTopArtistChange: function(selectedArtist) {
    this.setState({
      selectedArtist: selectedArtist
    });
  },
  onTopArtistBackground: function(selectedArtist) {
    this.setState({
      selectedArtist: selectedArtist
    });
  },
  render: function () {
    var selectedArtist = this.state.selectedArtist;
    var featuredBackground; 
    if (selectedArtist.albumArtUrl) {
      featuredBackground = {
        backgroundImage: 'url(' + selectedArtist.albumArtUrl + ')'
      };
    }

    return(
      <div>
        <div style={featuredBackground} className="featured-wrapper pad-r-lg">
          <div className="featured-overlay"></div>
          <div className="featured-content">
            <h2>Listen to</h2>
            <span className="featured-artist-name" onClick={this.props.navigateToArtist.bind(this, selectedArtist)}>{selectedArtist.name}</span>
            <h4 className="featured-artist-song">{selectedArtist.songName}</h4>
            <div className="featured-description">
              <h4>{selectedArtist.bio}</h4>
            </div>
          </div>
          <div className="play">  
            <button className="play-btn"><h3 className="icon-play fa-2x pad-box-sm">PLAY NOW</h3></button>
            <h4>Download Now</h4>
          </div>
          <div className="large-desktop-space">
            <TopAlbums onTopArtistBackground={this.onTopArtistBackground} onTopArtistChange={this.onTopArtistChange} />
          </div>  
        </div>  
      </div>
    )
  }
}));
