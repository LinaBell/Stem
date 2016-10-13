var SubmitMusicTrack = React.createClass({
	getInitialState: function() {
		var statusMessage = this.props.statusMessage && this.props.statusMessage.length > 0 ? 
			this.props.statusMessage : '';

		return {
			genreTag: null,
		  	genreTagValues: [],
		  	addedTracks: [],
		  	currentTrack: this.newTrack(),
		  	statusMessage: statusMessage,
		  	isAudioUploading: false
		}
	},
	componentDidMount: function() {
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
	  							data: {
	  								name: item.fileName,
	  								size: 0 // TODO: We don't have this info on get
	  							}
	  						},
	  						selectedGenres: item.tags,
	  						lyrics: item.lyrics,
	  						youTubeVideoId: item.youTubeVideoId,
	  						isrc: item.isrc || '',
	  						status: item.status,
	  						isEditing: false
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
			isEditing: true
		};
	},
	onTrackChange: function(track) {

		var currentTrack = this.state.currentTrack;
		currentTrack = Object.assign({}, currentTrack, track);

		this.setState({
			currentTrack: currentTrack,
			isAudioUploading: track.isAudioUploading
		});
	},

	onAddClicked: function() {
		var currentTrack = this.state.currentTrack;

		if (this.validate(currentTrack)) {
			var newState = [].concat(this.state.addedTracks);
			newState.push(Object.assign({}, currentTrack, { isEditing: false }));

			this.setState({
				addedTracks: newState,
				currentTrack: this.newTrack(),
				statusMessage: ''
			});
		} else {
			this.setState({
				statusMessage: 'The track is not valid, please add an audio file, title, and genre before adding the track'
			});
		}
	},

	onEditTrack: function(index) {
		var selectedTrack = this.state.addedTracks[index];
		selectedTrack.isEditing = true;
		
		this.setState({
			currentTrack: selectedTrack,
			statusMessage: ''
		});
	},
	
	onIncreaseOrder: function(index) {
		var newArray = [].concat(this.state.addedTracks);
		
		var temp = newArray[index];
		newArray[index] = newArray[index + 1];
		newArray[index + 1] = temp;

		this.setState({
			addedTracks: newArray
		});
	},

	onDecreaseOrder: function(index) {
		var newArray = [].concat(this.state.addedTracks);
		
		var temp = newArray[index];
		newArray[index] = newArray[index - 1];
		newArray[index - 1] = temp;

		this.setState({
			addedTracks: newArray
		});
	},
	
	validate: function(track) {
		
		return track.trackName && track.trackName.length > 0 && 
		  	track.audioFile && 
		  	track.selectedGenres && track.selectedGenres.length > 0;
	},
	upsertTracks: function(album, artistName) {

		return Promise.map(this.state.addedTracks, (track, index) => {
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
					tagIds: track.selectedGenres.map((genreItem) => {
						return genreItem.id;
					}),
					lyrics: track.lyrics,
					youTubeVideoId: track.youTubeVideoId, // TODO: This field might be changing
					isExplicit: track.isExplicit
				})
				.then((res) => {
					track.id = res.id;

					console.log('Track Created: ' + JSON.stringify(res));
					
					return res;
				});
			}
		});
	},
	render: function() {
		var numTracks = this.state.addedTracks.length;
		var canIncreaseOrDecrease = numTracks >= 2 && !this.state.isAudioUploading;

		return (	
			<div className="submit-track-edit-wrapper col-xs-12">
				{ this.state.addedTracks.length > 1 ? 
					<div className="submit-edit-track-header">
						<p className="order-track">{ !this.props.isAdmin ? "Order" : null }</p>
						<p>Track Name</p>
					</div> : null
				}
				<ul className="tag-list">
					{ this.state.addedTracks.map((item, index) => {
						return ( 
							<li key={ index } className="pad-b-sm">
								<div className="col-xs-12">
								{ canIncreaseOrDecrease && index < numTracks - 1 ?
									<i onClick={ this.onIncreaseOrder.bind(this, index) } className="icon-down-open fa-2x"></i> : null }
								{ canIncreaseOrDecrease && index > 0 ?
									<i onClick={ this.onDecreaseOrder.bind(this, index) } className="icon-up-open fa-2x"></i> : null }
								</div>

								<TrackItem 
									item={ item }
									isEditing={ item.isEditing }
									index={ index }
									onEditTrack={ this.onEditTrack } 
									isAdmin={ this.props.isAdmin } />
								
							</li> 
						);
					})}
				</ul>

				<TrackEditor 
					item={ this.state.currentTrack }
					genreTag={ this.state.genreTag } 
					genreTagValues={ this.state.genreTagValues }
					onChange={ this.onTrackChange }
					isAdmin={ this.props.isAdmin }
				/>

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
				        	<i className="icon-plus-circled"></i> Add Additional Track
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
