var PromoLandingTopSection = React.createClass({
	render: function() {
		var artist = this.props.artist;
		if (!artist) {
			artist = ''
		}
		var bannerImageStyle = {
	      		backgroundImage: 'url(' + artist.bannerImageUrl + ')'
		    };
		return(
			<div className="promo-landing-top-section">
				<div className="promo-background header-banner" style={bannerImageStyle}></div>
				<MusicPlayer songId="33" />
				<div className="promo-share-this">
					<p className="display-inlb">Share this: </p>
					<div className="promo-share-link display-inlb pad-box-md mar-l-md mar-r-md mar-b-sm">https://www.thmatc.co/inmemoryrocksmysocks/266262426622</div>
					<ul className="links-color display-inlb">
						<li className="icon-twitter-bird fa-2x"></li>
						<li className="icon-facebook-4 fa-2x"></li>
						<li className="icon-googleplus-rect-1 fa-2x"></li>
					</ul>
				</div>
			</div>
		)
	}
})