var ArtistSettings = React.createClass({
	render: function() {
	    return (
	        <div className="content-vh content-padding">
				<ArtistAccountSettings />
				<ArtistContactInfo />
				<ArtistConnectedAccounts />
				<ArtistPassword />
            </div>
	    )
  	}
});