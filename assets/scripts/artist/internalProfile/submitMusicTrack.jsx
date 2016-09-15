var SubmitMusicTrack = React.createClass({
	getInitialState: function() {
		return {
			genreTag: null,
		  	genreTagValues: [],
		  	addedTracks: [],
		  	isSubmitting: false,
		  	statusMessage: ''
		}
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
				return stemApi.getSongsByAlbum({ id: this.props.albumId });
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
	  						additionalCredits: item.additionalCredits,
	  						audioFile:  '', // TODO: Wire this up
	  						selectedGenres: null, // TODO: Wire this up
	  						lyrics: item.lyrics,
	  						youTubeShareLink: item.youTubeShareLink,
	  						isrc: item.isrc,
	  						isEditing: false
						};
					})
				});

				return;
			} else {
				this.setState({
					addedTracks: this.state.addedTracks.concat({
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
					})
				});
				
			}
		})
		.catch((reason) => {
			console.error('Error initializing SubmitMusicTrack page: ' + Utilities.normalizeError(reason));
		});
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

		if (this.validate(this.state.addedTracks[currentIndex])) {
			var newState = [].concat(this.state.addedTracks);
			newState[currentIndex] = Object.assign({}, this.state.addedTracks[currentIndex], { isEditing: false });
			newState.push({
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
			});

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
	
	onDecreaseOrder: function(track) {
		var currentIndex = this.state.addedTracks.indexOf(track);

		if (currentIndex < this.state.addedTracks.length - 1) {
			var newArray = [].concat(this.state.addedTracks);
			var temp = newArray[currentIndex];
			
			newArray[currentIndex] = newArray[currentIndex + 1];
			newArray[currentIndex + 1] = temp;

			this.setState({
				addedTracks: newArray
			});
		}
	},
	
	validate: function(track) {
		// TODO: Implement visual validation later
		return track.trackName && track.trackName.length > 0 && 
		  	track.audioFile && 
		  	track.selectedGenres && track.selectedGenres.length > 0;
	},
	createTracks: function(album, artistName) {
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
					youTubeShareLink: track.youTubeShareLink,
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
				<p className="order-track">{ !this.props.isAdmin ? "Order" : null }</p>
				<p>Track Name</p>
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
										onAddClicked={ this.onAddClicked }
										statusMessage= { this.state.statusMessage }
									/> :
									<TrackItem 
										item={ item }
										index={ index }
										onEditTrack={ this.onEditTrack } 
										onDecreaseOrder={ this.onDecreaseOrder }
										playerStateVisible={ true } />
								}
							</li> 
						);
					})}
				</ul>
			</div>		
		);
	}
});