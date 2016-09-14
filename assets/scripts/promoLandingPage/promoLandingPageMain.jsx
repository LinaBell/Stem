var PromoLandingPageMain = React.createClass({
	render: function() {
		return(
			<div className="">
				<PromoLandingHeader />
				<PromoLandingTopSection />
				<div className="promo-landing-main-bottom-web pad-box-sm">
					<BecomeAPatron />
					<PromoLandingContent />
				</div>
				<div className="promo-landing-main-bottom-mobile pad-box-sm">
					<PromoLandingContent />
				</div>
				<div className="promo-patreon-mobile">
					<BecomeAPatron />
				</div>
				<div className="">
					<PromoLandingFooter />
				</div>
			</div>
		)
	}
})