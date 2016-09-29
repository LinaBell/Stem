var AdminSubmitMusic = React.createClass({
	getInitialState: function() {
		return {
			isSubmitting: false,
			statusMessage: ''
		};
	},
	onSubmitClicked: function() {
		var tracks = this.refs.submitMusicTrack.state.addedTracks;
		var album = this.refs.SubmitMusicAlbum.state;

		this.setState({
			isSubmitting: true
		});

		Promise.each(tracks, (item, index) => {
			return stemApi.updateSongAdmin({
				id: item.id,
				status: item.status,
				artistName: album.artistName,
				status: item.status,
				name: item.trackName,
				trackNumber: index + 1,
				additionalCredits: item.additionalCredits,
				releaseDate: item.releaseDate,
				lyrics: item.lyrics,
				isExplicit: item.isExplicit,
				isrc: item.isrc,

				overrideTags: item.selectedGenres.map((item) => {
					return item.id;
				}),
				// TODO: Link up the youtubeVideoId 
				//youTubeVideoId: 0
			})
			.then((res) => {
				console.log('Track updated successfully: ' + JSON.stringify(res));
			})
			
		})
		.then((res) => {
			console.log('All tracks updated successfully');
		})
		.catch((reason) => {
			var errorMessage = 'Error updating track(s): ' + Utilities.normalizeError(reason);
			console.error(errorMessage);
			this.setState({
				statusMessage: errorMessage
			});
		})
		.finally(() => {
			this.setState({
				isSubmitting: false
			});
		});
	},
	render: function() {
    	return (
      		<div className="artist-internal-wrapper-fluid pad-b-lg">
          		<div className="bg-white">  
              		<div>
		            	<div className="pad-box-lg">
		                	<h3>Submit Music</h3>
		                	<p>Submit music to be promoted to our creators</p>
		              	</div>    
	                	<SubmitMusicAlbum
	                		ref="SubmitMusicAlbum"
	                		albumId={ this.props.albumId }
	                	/>
	                	<SubmitMusicTrack 
	                		ref="submitMusicTrack"
	                		albumId={ this.props.albumId }
                        	onSubmitClicked={ this.onSubmitClicked } 
                        	isSubmitting={ this.state.isSubmitting } 
                        	statusMessage={ this.state.statusMessage }
                        	isAdmin={ true }
	                	/>
              		</div>    
          		</div>     
      		</div>
    );
  }
});