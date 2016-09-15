var ArtistSettings = React.createClass({
	render: function() {
	    return (
	        <div>
				<ArtistAccountSettings />
				<ArtistContactInfo />
				<ArtistConnectedAccounts />
				<ArtistPassword />
            </div>
	    )
  	}
});