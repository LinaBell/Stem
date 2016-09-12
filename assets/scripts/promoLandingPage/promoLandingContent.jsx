var PromoLandingContent = React.createClass({
	render: function() {
		return(
			<div className="promo-landing-content mar-t-lg pad-box-sm">
				<img src="https://a4-images.myspacecdn.com/images03/33/588cae99266a4ae2a9c49c909b02781c/600x600.jpg" className="header-img mar-b-lg" />
				<h2 className="mar-t-md mar-b-md">InMemory</h2>
				<p className="promo-artist-bio mar-b-lg">Bacon ipsum dolor amet cupim turducken shoulder beef picanha doner. Prosciutto swine cupim, hamburger fatback ribeye drumstick kevin pork chop capicola pork. Pork chop landjaeger chuck meatball shankle drumstick sausage. Hamburger cow meatball, rump strip steack t-bone capicola porchetta prosciutto tail pig.</p>
				<div className="follow-artist-with-links pad-t-md">
					<p className="follow-this-artist">Follow this artist: </p>
					<p className="links-color"><FollowThisArtistLinks /></p>
				</div>
			</div>
		)
	}
})