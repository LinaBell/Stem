var FeaturedArtist = React.createClass({
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
            <span className="featured-artist-name">{selectedArtist.name}</span>
            <span className="featured-artist-song red"><h4>{selectedArtist.songName}</h4></span>
            <div className="pad-t-sm pad-b-sm"><span className="icon-heart fa-2x red"></span> {selectedArtist.bookmarkCount} </div>
            <div className="featured-description">
              <h4>{selectedArtist.bio}</h4>
            </div>
          </div>
          <div className="play">  
            <button className="play-btn"><h3 className="icon-play fa-2x pad-box-sm">PLAY NOW</h3></button>
            <a><p>Go to artist page</p></a>
          </div>
          <TopAlbums />
        </div>  
      </div>
    )
  }
});