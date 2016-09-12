var PromoLandingTopSection = React.createClass({
	render: function() {
		// var bannerImageStyle = {
	 //      		backgroundImage: 'url(' + artist.bannerImageUrl + ')'
	 //    };
		return(
			<div className="promo-landing-top-section">
				<div className="promo-background header-banner"></div>
				<div className="promo-song-info">
					<img className="promo-artist-img pull-left mar-r-lg" src="https://a4-images.myspacecdn.com/images03/33/588cae99266a4ae2a9c49c909b02781c/600x600.jpg"/>
					<h2 className="mar-t-sm">InMemory - Never forget</h2>
					
					<h3 className="display-inlb">Follow this artist:</h3>
					<FollowThisArtistLinks/>
				</div>
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