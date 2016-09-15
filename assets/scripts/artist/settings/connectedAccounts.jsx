var ArtistConnectedAccounts = React.createClass({
	render: function() {
		return(
            <div className="artist-account-connected-accounts pad-box-lg"> 
				<div className="divider col-xs-12"></div>
				<div className="artist-account-contact-header col-xs-12">
					<h3>Connected Accounts</h3>
					<h5>By connecting your other accounts, we'll be able to help you track your music </h5>
				</div>
				<div className="col-xs-12 col-lg-6">
					<ul className="artist-connected-links col-xs-12 col-sm-8 col-md-12">
						<li className="" id="facebook">
							<span className="icon-facebook-squared fa-2x col-xs-1"></span>
							<h3 className="col-xs-3">Connected</h3>
						</li>
						<li className="">
							<span className="icon-twitter-1 fa-2x col-xs-1 "></span>
							<h3 className="col-xs-3">Connect</h3>
						</li>
						<li className="">
							<span className="icon-youtube fa-2x col-xs-1"></span>
							<h3 className="col-xs-3">Connect</h3>
						</li>
						<li className="">
							<span className="icon-soundcloud-1 fa-2x col-xs-1"></span>
							<h3 className="col-xs-3">Connect</h3>
						</li>
						<li className="">
							<span className="icon-soundcloud fa-2x col-xs-1"></span>
							<div className="pull-right col-xs-9">
								<input />
							</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
});