var BecomeAPatron = React.createClass({
	render: function() {
		return(
			<div className="become-a-patron col-sm-12 col-md-5">
				<div className="patreon-main-content bg-grey-6 pad-box-lg">
					<h2 className="mar-t-sm mar-b-md">Become a Patron!</h2>
					<p className="mar-b-lg">We've partnered with Patreon to make it easy to support this artist. If you love what you're hearing, consider becoming a patron!</p>
					<div className="artist-donation-box mar-t-lg pad-t-lg pad-r-md pad-b-md pad-l-md">
						<h4 className="display-inlb">Give $ </h4>
						<input type="text" name="patreon-artist-donation" /> 
						<h4 className="display-inlb"> per <span>Patron Session</span></h4>
						<button type="button" className="">Become a Patron</button>
					</div>
				</div>
				<div className="patreon-footer pad-box-sm">
					<img src="assets/images/patreon_logo.png" className="pull-right"/>
				</div>
			</div>
		)
	}
})