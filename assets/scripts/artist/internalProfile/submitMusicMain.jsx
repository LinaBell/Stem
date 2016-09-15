var SubmitMusicMain = ReactRedux.connect(null, function(dispatch) { 
	return {
		navigateTagsPage: function() {
				dispatch({
					type: 'GoToPage',
					data: {
						currentPage: 9
					}
				});
			}
		};
	})
(React.createClass({
	submitClicked: function() {
		var album = this.refs.submitMusicAlbum;
		var track = this.refs.submitMusicTrack;
		
		track.setState({
			isSubmitting: true
		});

		// TODO: The releaseDate and artist names should not have to be passed in; however, there's a discrepancy between
		// the API and the UI design, revisit this later
		return album.createAlbum(track.state.releaseDate)
			.then(function(res) {
				return track.createTracks(res, album.state.artistName);
			})
			.then(function(res) {
				console.log('Album created successfully: ' + JSON.stringify(res));
				track.setState({
					isSubmitting: false,
					statusMessage: ''
				});

				this.props.navigateTagsPage();
			}.bind(this))
			.catch(function(reason) {
				var errorMessage = Utilities.normalizeError(reason);

				console.error('Error while creating album/track: ' + errorMessage);
				track.setState({
					isSubmitting: false,
					statusMessage: errorMessage
				});
			});
	},
    render: function () {
        return (
            <div className="artist-internal-wrapper-fluid pad-b-lg">
                <div className="bg-white">  
                    <div>
                        <div className="pad-box-lg">
                            <h3>Submit Music</h3>
                            <p>Add music to your library</p>
                        </div>    
                        <SubmitMusicAlbum ref="submitMusicAlbum" />
                        <SubmitMusicTrack ref="submitMusicTrack" onSubmitClicked={ this.submitClicked } />
                    </div>    
                </div>     
            </div>
        );
    }
}));