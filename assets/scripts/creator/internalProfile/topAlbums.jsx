var TopAlbums = React.createClass({
	getInitialState: function() {
		return {
			windowWidth: 1,
			topAlbumWidth: 0,
			albumItemWidth: 270,
			topArtists: []
		};
	},

	componentDidMount: function() {
		stemApi.getArtistsPopular({})
    .then(function(response) {
      this.setState({topArtists: response});
      console.log(this.state.topArtists);
    }.bind(this), function(error) {
      console.error('Top Artist Error: ' + JSON.stringify(error));
    });

		this.slideShow();

		var l = $('.top-album-wrapper ul li').length,
			w = $('.top-album-wrapper ul li').width(),
			windowWidth = window.innerWidth,
			topAlbumWidth = l * w,
			albumItemWidth = this.state.albumItemWidth;

		if(windowWidth > topAlbumWidth) {
			albumItemWidth = windowWidth / l;
		};

		this.setState({
			windowWidth: windowWidth,
			topAlbumWidth: topAlbumWidth,
			style: {width: albumItemWidth}
		});
	},

	slideShow: function(){
		var self = this;
		setInterval(this.moveRight, 5000);
	},
	moveLeft: function() {
		var w = this.state.albumItemWidth;
		$('.top-album-wrapper ul').animate({
			left: w
		}, "slow", function () {
			$('.top-album-wrapper ul li:last-child').prependTo('.top-album-wrapper ul');
			$('.top-album-wrapper ul').css('left', '');
		});
	},

	moveRight: function() {
		var w = this.state.albumItemWidth;
		$('.top-album-wrapper ul').animate({
			left: -w
		}, "slow", function () {
			$('.top-album-wrapper ul li:first-child').appendTo('.top-album-wrapper ul');
			$('.top-album-wrapper ul').css('left', '');
		});
	},
  render: function() {
	   var topArtist = this.state.topArtists
		return(
		  <div className="top-album-wrapper">
		  	<h4>Other awesome artists</h4>
				<a onClick={this.moveRight} className="album-nav-next icon-right-open-big"></a>
	      <a onClick={this.moveLeft} className="album-nav-prev icon-left-open-big"></a>
				<ul className="top-album-list">
				  {this.state.topArtists.map(function(topArtist, index) {
						return(
							<TopArtistsList key={index} topArtist={topArtist} />
						);
					})}
				</ul>
		  </div>
		)
  }
});

var TopArtistsList = React.createClass({
	render: function() {
		var topArtist = this.props.topArtist
		return (
			<div className="top-album-list-item-wrapper">
				<li className="top-album-list-item"><img className="top-album-img" src={topArtist.albumArtUrl} /></li>
			</div>
		)
	}
});
