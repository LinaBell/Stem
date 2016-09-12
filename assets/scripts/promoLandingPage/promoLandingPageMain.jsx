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
					<BecomeAPatron />
				</div>
				<div className="">
					<PromoLandingFooter />
				</div>
			</div>
		)
	}
})