var SubmitMusicTrack = React.createClass({
	getInitialState: function() {
		var statusMessage = this.props.statusMessage && this.props.statusMessage.length > 0 ? 
			this.props.statusMessage : '';

		return {
			genreTag: null,
		  	genreTagValues: [],
		  	addedTracks: [],
		  	statusMessage: statusMessage
		}
	},
	createNewTrack: function() {
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
			youTubeShareLink: '',
			isEditing: true
		};
	},
	componentDidMount: function() {
		stemApi.getAllTagTypes({
			systemType: Tag.SystemType.Genre
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
	  						releaseDate: Date.parse(item.releaseDate),
	  						additionalCredits: item.additionalCredits || '',
	  						audioFile:  {
	  							data: {
	  								name: item.fileName,
	  								size: 0 // TODO: We don't have this info on get
	  							}
	  						},
	  						selectedGenres: item.tags,
	  						lyrics: item.lyrics,
	  						youTubeShareLink: item.youTubeShareLink,
	  						isrc: item.isrc || '',
	  						isEditing: false
						};
					})
				});
			} else {
				this.setState({
					addedTracks: this.state.addedTracks.concat(this.createNewTrack())
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
	onTrackChange: function(track) {
		var currentIndex = this.state.addedTracks.findIndex((item) => {
			return item.isEditing;
		});

		var newState = [].concat(this.state.addedTracks);
		newState[currentIndex] = Object.assign({}, this.state.addedTracks[currentIndex], track);

		this.setState({
			addedTracks: newState
		});
	},

	onAddClicked: function() {
		var currentIndex = this.state.addedTracks.findIndex((item) => {
			return item.isEditing;
		});

		if (currentIndex === -1 || this.validate(this.state.addedTracks[currentIndex])) {
			var newState = [].concat(this.state.addedTracks);
			newState[currentIndex] = Object.assign({}, this.state.addedTracks[currentIndex], { isEditing: false });
			newState.push(this.createNewTrack());

			this.setState({
				addedTracks: newState,
				statusMessage: ''
			});
		} else {
			this.setState({
				statusMessage: 'The track is not valid, please add an audio file, title, and genre before adding the track'
			});
		}
	},

	onEditTrack: function(index) {
		var currentIndex = this.state.addedTracks.findIndex((item) => {
			return item.isEditing;
		});

		var newState = [].concat(this.state.addedTracks);
		newState[currentIndex] = Object.assign({}, this.state.addedTracks[currentIndex], { isEditing: false });
		newState[index] = Object.assign({}, this.state.addedTracks[index], { isEditing: true });
		
		this.setState({
			addedTracks: newState,
			statusMessage: ''
		});
	},
	
	onIncreaseOrder: function(index) {
		if (index < this.state.addedTracks.length - 1) {
			var newArray = [].concat(this.state.addedTracks);
			
			var temp = newArray[index];
			newArray[index] = newArray[index + 1];
			newArray[index + 1] = temp;

			this.setState({
				addedTracks: newArray
			});
		}
	},
	
	validate: function(track) {
		
		return track.trackName && track.trackName.length > 0 && 
		  	track.audioFile && 
		  	track.selectedGenres && track.selectedGenres.length > 0;
	},
	updateCreateTracks: function(album, artistName) {

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
					youTubeShareLink: track.youTubeShareLink, // TODO: This field might be changing
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
								{ item.isEditing ? 
									<TrackEditor 
										item={ item }
										genreTag={ this.state.genreTag } 
										genreTagValues={ this.state.genreTagValues }
										onChange={ this.onTrackChange }
									/> :
									<TrackItem 
										item={ item }
										index={ index }
										onEditTrack={ this.onEditTrack } 
										onIncreaseOrder={ this.onIncreaseOrder }
										isAdmin={ this.props.isAdmin } />
								}
							</li> 
						);
					})}
				</ul>

				{ this.props.isAdmin ? 
					<div className="admin-state-btn-wrapper">
				        <ul>
							<li>
								<div className="pending-state">Pending</div>
							</li>
							<li>
								<div className="approved-state">Approved</div>
							</li>
							<li>
								<div className="live-state">Live</div>
							</li>
							<li>
								<button onClick={ this.props.onSubmitClicked } className="save-state">Save & Close</button>
							</li>
				        </ul>
				    </div> : 
					<div className="submit-btns">
				        <button className="additional-track-btn mar-r-md" onClick={ this.onAddClicked }>
				        	<i className="icon-plus-circled"></i> Add Additional Track
				        </button>

				        { this.props.isSubmitting ? <LoadingButton /> : 
					        <button className="btn-primary" onClick={ this.props.onSubmitClicked }>
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