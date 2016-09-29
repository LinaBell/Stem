 var TopAlbums = React.createClass({
  getInitialState: function() {
    return {
      topArtists: []
    };
  },

  componentDidMount: function() {
    stemApi.getArtistsPopular({})
    .then(function(response) {
      this.setState({topArtists: response});
    }.bind(this), function(error) {
      console.error('Top Artist Error: ' + JSON.stringify(error));
    });

  },

  render: function() {
      var topArtist = this.state.topArtists;
      var settings = {
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 6000,
        infinite: true,
        easing: 'ease-in-out',
        speed: 2000,
        centerMode: true,
        centerPadding: '60px'
        // prevArrow: <PrevArrow />,
        // nextArrow: <NextArrow />
      }
    return(
      <div className="top-album-wrapper">
        <h4>Other awesome artists</h4>
        <ul className="top-album-list">
          <Slider slidesToShow='5' autoplay='true' autoplaySpeed='6000' infinite='true' easing='ease-in-out' speed='2000' centerMode='true' centerPadding='60px'>
          {this.state.topArtists.map(function(topArtist, index) {
            return(
              <TopArtistsList key={index} topArtist={topArtist} />
            );
          })}
            </Slider>
        </ul>
      </div>
    )
  }
});

var TopArtistsList = React.createClass({
  render: function() {
    var topArtist = this.props.topArtist;
    return (
    <li className="top-album-list-item"><img className="top-album-img" src={topArtist.albumArtUrl} /></li>

    );
  }
});

// var PrevArrow = React.createClass({
//   render: function() {
// 	var arrowPrevClass = "album-nav-prev icon-left-open-big"
//     return (
//       <div {...this.props} className={arrowPrevClass}></div>
//     );
//   }
// });

// var NextArrow = React.createClass({
//   render: function() {
// 	var arrowNextClass = "album-nav-next icon-right-open-big"
//     return (
//       <div {...this.props} className={arrowNextClass}></div>
//     );
//   }
// });