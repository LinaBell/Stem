var ArtistProfileHeader = React.createClass({
	follow: function() {
		// TODO: Do the thing where you follow this artist
	},
	render: function() {
		var artist = this.props.artist,
			bannerImageStyle = {
      			backgroundImage: 'url(' + artist.bannerImageUrl + ')'
    		};
		return (
		<div className="header-wrapper">
			<div className="header-banner" style={bannerImageStyle}>
			</div>
			<div className="header-content-wrapper pad-l-lg">
				<img className="header-img" src={artist.profileImageUrl} />
				<div className="header-content-detail pad-l-lg">
					<h1>{artist.name}</h1>
					<h4 className="pad-t-sm pad-b-md">{artist.bio}</h4>
					<button className="btn-primary" onClick={this.follow}>
						<h4 className="pad-l-md pad-r-md">
							<span className="icon-user-add"></span>
							Follow
						</h4>
					</button>
				</div>
			</div>
			<div className="header-social-media mar-t-sm pad-r-lg pull-right">
				<ul>
					<li><span className="icon-soundcloud fa-2x"></span></li>
					<li><span className="icon-youtube-1 fa-2x"></span></li>
					<li><span className="icon-instagram-3 fa-2x"></span></li>
					<li><span className="icon-spotify-circled fa-2x"></span></li>
					<li><span className="icon-twitter fa-2x"></span></li>
					<li><span className="icon-facebook fa-2x"></span></li>
				</ul>
			</div>
		</div>
		)
	}
});