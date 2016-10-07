 var TopAlbums = React.createClass({
  getInitialState: function() {
    return {
      topArtists: []
    };
  },
  componentWillUnmount: function() {
  	$(this.refs.slickRef).slick('unslick')
  },

  componentDidMount: function() {
    stemApi.getArtistsPopular({})
    .then((response) => {
        this.setState({topArtists: response});
		$(this.refs.slickRef).slick({
			centerMode: true,
			centerPadding: '30px',
			slidesToShow: 5,
			autoplay: true,
			autoplaySpeed: 5000,
			slidesToShow: 3,
			centerMode: true,
			centerPadding: '80px',
			speed: 800,
			variableWidth: true,
			slidesToScroll: 1,
			waitForAnimate: false,
			cssEase: 'ease-in-out'
		});
		$(this.refs.slickRef).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
			var topArtistStyle = {
	    		transform: 'scale(1)',
	    		transition: 'transform 100ms ease-in'
		    }
      if (currentSlide + 1 >= this.state.topArtists.length) {
        this.props.onTopArtistBackground(this.state.topArtists[0]);
        $('.slick-current').css(topArtistStyle);
      } else {
        this.props.onTopArtistBackground(this.state.topArtists[currentSlide + 1]);
        $('.slick-current').css(topArtistStyle);
      }
      });
      $(this.refs.slickRef).on('afterChange', (event, slick, currentSlide, nextSlide) => {

        var topArtistStyle = {
	    		transform: 'scale(1.2)',
	    		transition: 'transform 100ms ease-in'
	    	}
			if (currentSlide + 1 <= this.state.topArtists.length || currentSlide + 1 == this.state.topArtists.length ) {
				$('.slick-current').css(topArtistStyle);
			}
	    });
    })
    .catch((reason) => {
      console.error('Top Artist Error: ' + JSON.stringify(reason));
    });

  },
  render: function() {
    var topArtists = this.state.topArtists;

    return(
      <div className="top-album-wrapper">
        <h4>Other awesome artists</h4>
        
        
          <div ref="slickRef" >
	          {this.state.topArtists.map((topArtist, index) => {
	            return(
	              <TopArtistsList key={index} topArtist={topArtist} onTopArtistChange={this.props.onTopArtistChange} />
	            );
	          })}
           </div>
        </div>
  
    )
  }
});

var TopArtistsList = React.createClass({
    onClick: function() {
    	this.props.onTopArtistChange(this.props.topArtist)
    },
  	render: function() {
    var topArtist = this.props.topArtist;

    return (
    	<img className="top-album-img top-album-list-item" src={topArtist.albumArtUrl} onClick={this.onClick} />
    );
  }
});
