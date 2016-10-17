var SubmitMusicMain = ReactRedux.connect(null, function(dispatch) { 
	return {
		navigateTagsPage: function() {
			dispatch({
				type: 'GoToPage',
				data: {
					currentPage: 6
				}
			});
		}
	};
})
(React.createClass({
	getInitialState: function() {
		return {
			isSubmitting: false,
			statusMessage: '',
			showConfirm: false
		};
	},
	onSubmitClicked: function() {
		var album = this.refs.submitMusicAlbum;
		var track = this.refs.submitMusicTrack;
		
		this.setState({
			isSubmitting: true,
			statusMessage: ''
		});

		// TODO: The releaseDate and artist names should not have to be passed in; however, there's a discrepancy between
		// the API and the UI design, revisit this later
		return album.createAlbum(track.state.releaseDate)
			.then((res) => {
				return track.upsertTracks(res, album.state.artistName);
			})
			.then((res) => {
				this.setState({
					isSubmitting: false,
					statusMessage: '',
					showConfirm: true
				});
			})
			.catch((reason) => {
				var errorMessage = Utilities.normalizeError(reason);

				this.setState({
					isSubmitting: false,
					statusMessage: errorMessage
				});
			});
	},
    render: function () {
        return (
            <div className="artist-internal-wrapper-fluid content-vh pad-b-lg">
                <div className="bg-white">  
                    <div>
                        <div className="pad-box-lg">
                            <h3>Submit Music</h3>
                            <p>Add music to your library</p>
                        </div>    
                        <SubmitMusicAlbum ref="submitMusicAlbum" />
                        <SubmitMusicTrack 
                        	ref="submitMusicTrack" 
                        	onSubmitClicked={ this.onSubmitClicked } 
                        	isSubmitting={ this.state.isSubmitting } 
                        	statusMessage={ this.state.statusMessage } />
                        <SubmitTrackConfirm show={ this.state.showConfirm } onConfirmed={ this.props.navigateTagsPage } />
                    </div>    
                </div>     
            </div>
        );
    }
}));