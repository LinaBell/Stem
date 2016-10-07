var ArtistProfile = React.createClass({
	
    render: function() {
        var self = this;
		
		return (
			<div className="artist-main-wrapper mar-t-sm content-vh">
				<ArtistFeatured />
				<ArtistMainContent />
			</div>	
		);
	}
});
