var ArtistSettings = React.createClass({
	render: function() {
	    return (
	        <div className="pad-box-lg">
				<ArtistAccountSettings />
				<ArtistContactInfo />
				<ArtistConnectedAccounts />
				<ArtistPassword />
            </div>
	    )
  	}
});