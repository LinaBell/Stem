var ArtistPassword = React.createClass({
	render: function() {
		return(
			<div className="pad-box-lg">
				<div className="divider col-xs-12"></div>
				<div className="col-xs-12 pad-b-lg">
					<h3>Password</h3>
					<h5>Update your password</h5>
				</div>
				<div className="col-xs-12 col-sm-8 col-md-5 col-lg-5">
					<input placeholder="Current Password" />
					<input placeholder="New Password" />
					<input placeholder="New Password Again" />
					<button className="btn btn-wide btn-primary">
						Change Password
					</button>
				</div>
			</div>
		)
	}
});