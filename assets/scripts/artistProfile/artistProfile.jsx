var ArtistProfile = React.createClass({
	getInitialState: function() {
		return {
			songs: [],
			artist: {}
		} 
	},
	componentDidMount: function() {
		var artist;

		stemApi.getArtist({
			id: this.props.artistId
		})
		.then((res) => {
			artist = res;

			return stemApi.getSongsByArtist({
				artistId: this.props.artistId
			})
		})
		.then((res) => {
			this.setState({
				songs: res,
				artist: artist
			})
		})
		.catch((error) => {
			console.error('Error occured while fetching songs by artist: ' + Utilities.normalizeError(error));
		});
	},
	render: function() {
		return (
		<div className="wrapper-content">
			<ArtistProfileHeader artist={this.state.artist} />
			<div className="artist-profile-wrapper col-xs-12 content-padding">
		  		<div className="tables-page">
		    		<ArtistProfileTable songs={this.state.songs} />
		  		</div> 
			</div>   
		</div>
		);
	}
});