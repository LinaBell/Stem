var PromoLandingContent = React.createClass({
	render: function() {
		var song = this.props.song;
		var artist = this.props.artist;
		if (!artist) {
			artist = ''
		}
		return(
			<div className="promo-landing-content mar-t-lg pad-box-sm">
				<div className="col-xs-12 col-md-7">
					<img src={artist.profileImageUrl} className="header-img mar-b-lg" />
					<h2 className="mar-t-md mar-b-md">{artist.name}</h2>
					<p className="promo-artist-bio mar-b-lg">{artist.bio}</p>
				</div>
				<div className="col-xs-12 col-md-5 pull-right">
					<BecomeAPatron />
				</div>
				<div className="col-xs-12">	
					<div className="follow-artist-with-links pad-t-md">
						<p className="follow-this-artist">Follow this artist: </p>
						<div className="links-color"><FollowThisArtistLinks /></div>
					</div>
				</div>		
			</div>
			)
	}
})