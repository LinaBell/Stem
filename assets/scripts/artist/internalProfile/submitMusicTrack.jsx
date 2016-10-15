var lastClientTrackId = 0;

var SubmitMusicTrack = React.createClass({
	getInitialState: function() {
		var statusMessage = this.props.statusMessage && this.props.statusMessage.length > 0 ? 
			this.props.statusMessage : '';

		return {
			genreTag: null,
		  	genreTagValues: [],
		  	addedTracks: [],
		  	statusMessage: statusMessage,
		  	currentTrack: null,
		  	isAudioUploading: false,
		  	trackStatusMessage: ''
		}
	},
	componentDidMount: function() {

		$(this.refs.editorDiv).dialog({
			dialogClass: 'track-editor-dialog',
			autoOpen: false,
			modal: true,
			resizable: false,
			width: 1000,
			height: 700,
			position: { my: 'top', at: 'top', of: '.artist-internal-wrapper-fluid' }
		});

		$(this.refs.trackList).sortable({
			placeholder: 'ui-state-highlight',
			cursor: 'move',
			tolerance: 'pointer'
		});

		stemApi.getAllTagTypes({
			systemType: TagSystemTypeEnum.Genre.value
		})
		.then((res) => {
			var genreTag = res[0];

			this.setState({
				genreTag: genreTag
			});

			return stemApi.getTagValues({
				tagTypeId: genreTag.id
			});

		})
		.then((res) => {
			this.setState({
				genreTagValues: res
			});

			if (this.props.albumId) {
				return stemApi.getSongsByAlbumAdmin({ id: this.props.albumId });
			}
		})
		.then((res) => {
			if (res) {
				this.setState({
					addedTracks: res.map((item) => {
						return {
							id: item.id,
							trackName: item.name,
							isExplicit: item.isExplicit,
	  						releaseDate: new Date(item.releaseDate).toDateString(),
	  						additionalCredits: item.additionalCredits || '',
	  						audioFile:  {
	  							name: item.fileName
	  						},
	  						selectedGenres: item.tags,
	  						lyrics: item.lyrics,
	  						youTubeVideoId: item.youTubeVideoId,
	  						isrc: item.isrc || '',
	  						status: item.status
						};
					})
				});
			}
		})
		.catch((reason) => {
			console.error('Error initializing SubmitMusicTrack page: ' + Utilities.normalizeError(reason));
		});
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.statusMessage && nextProps.statusMessage.length > 0) {
			this.setState({
				statusMessage: nextProps.statusMessage
			});
		}
	},
	newTrack: function() {
		return {
			id: null,
			trackName: '',
			isExplicit: false,
			isrc: '',
			releaseDate: '',
			additionalCredits: '',
			audioFile: null,
			selectedGenres: null,
			lyrics: '',
			youTubeVideoId: '',
			clientId: lastClientTrackId++
		};
	},
	openEditor() {
		$(this.refs.editorDiv).dialog('open');
	},
	closeEditor() {
		$(this.refs.editorDiv).dialog('close');
	},
	getSortedTracks() {
		return $(this.refs.trackList).sortable('toArray')
		.map((item) => {
			return parseInt(item.slice(5), 10);
		})
		.reduce((prev, current) => {
			prev.push(this.state.addedTracks[current]);
			return prev;
		}, [])
	},
	onSave: function(track) {

		if (!this.validate(track)) {
			this.setState({
				currentTrack: track,
				trackStatusMessage: 'The track is not valid, please add an audio file, title, and genre before adding the track'
			});

			return;
		}

		var existingTrackIndex = this.state.addedTracks.findIndex((item) => {
			return track.clientId === item.clientId;
		});

		var updatedAddedTracks = [].concat(this.state.addedTracks);

		if (existingTrackIndex !== -1) {
			var updatedTrack = Object.assign({}, this.state.currentTrack, track);
			updatedAddedTracks[existingTrackIndex] = updatedTrack;
		} else {
			var newTrack = Object.assign({}, this.state.currentTrack, track);
			updatedAddedTracks.push(newTrack);
		}

		this.setState({
			currentTrack: null,
			addedTracks: updatedAddedTracks,
			isAudioUploading: track.isAudioUploading,
			trackStatusMessage: '',
			statusMessage: ''
		});

		this.closeEditor();
	},

	onAddClicked: function() {
		var newTrack = this.newTrack();

		this.setState({
			currentTrack: newTrack,
			trackStatusMessage: ''
		});

		this.openEditor();
	},

	onEditTrack: function(index) {		
		this.setState({
			currentTrack: this.state.addedTracks[index]
		});

		this.openEditor();
	},
	
	validate: function(track) {
		
		return track.trackName && track.trackName.length > 0 && 
		  	track.audioFile && 
		  	track.selectedGenres && track.selectedGenres.length > 0;
	},
	upsertTracks: function(album, artistName) {

		if (this.state.addedTracks.length <= 0) {
			return Promise.reject('At least one track must be added to an album');
		}

		var sortedTracks = this.getSortedTracks();

		return Promise.map(sortedTracks, (track, index) => {
			if (!this.validate(track)) {
				return Promise.reject('The track is not valid, please add an audio file, title, and genre before adding the track');
			}

			if (!track.id) {
				return stemApi.createSong({
					artistName: artistName,
					name: track.trackName,
					trackNumber: index + 1,
					albumId: album.id,
					songFileId: track.audioFile.response.id,
					additionalCredits: track.additionalCredits,
					releaseDate: track.releaseDate,
					tagIds: track.selectedGenres.map((item) => {
						return item.id;
					}),
					lyrics: track.lyrics,
					youTubeVideoId: track.youTubeVideoId, // TODO: This field might be changing
					isExplicit: track.isExplicit
				});
			}
		});
	},
	render: function() {
		return (	
			<div className="submit-track-edit-wrapper pad-box-lg col-xs-12">
				{ this.state.addedTracks.length > 1 ? 
					<div className="submit-edit-track-header">
						<p>Track Name</p>
					</div> : null
				}
				<ul ref="trackList" className="tag-list">
					{ this.state.addedTracks.map((item, index) => {
						return ( 
							<li id={ 'track' + index } key={ index } className="pad-b-sm ui-state-default">
								<TrackItem 
									item={ item }
									index={ index }
									onEditTrack={ this.onEditTrack } 
									isAdmin={ this.props.isAdmin } />
								
							</li> 
						);
					})}
				</ul>

				<div ref="editorDiv">
					<TrackEditor 
						item={ this.state.currentTrack }
						genreTag={ this.state.genreTag } 
						genreTagValues={ this.state.genreTagValues }
						isAdmin={ this.props.isAdmin }
						onSave={ this.onSave }
						trackStatusMessage={ this.state.trackStatusMessage }
					/>
				</div>

				{ this.props.isAdmin ? 
					<div className="admin-state-btn-wrapper">
						<button onClick={ this.props.onSubmitClicked } className="save-state">Save & Close</button>
				    </div> 
				    : 
					<div className="submit-btns">
				        <button 
				        	disabled={ this.state.isAudioUploading }
				        	className="additional-track-btn mar-r-md" 
				        	onClick={ this.onAddClicked }>
				        	<i className="icon-plus-circled"></i> Add Track
				        </button>

				        { this.props.isSubmitting ? <LoadingButton /> : 
					        <button 
					        	disabled={ this.state.isAudioUploading }
					        	className="btn-primary" 
					        	onClick={ this.props.onSubmitClicked }>
					        	<i className="icon-ok-circled2"></i> Submit
					        </button>
					    }
			      	</div>
				}
				<p className="bg-danger">
					{ this.state.statusMessage }
				</p>
			</div>		
		);
	}
});
