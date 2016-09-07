var SubmitMusicTrack = React.createClass({
	getInitialState: function() {
		return {
			genreTag: null,
		  	genreTagValues: [],
		  	addedTracks: [],
		  	isSubmitting: false,

			id: null,
			trackName: '',
			isExplicit: false,
	  		isrc: '',
	  		releaseDate: '',
	  		additionalCredits: '',
	  		audioFile: null,
	  		selectedGenres: null,
	  		lyrics: ''
		}
	},
	getTrackState: function() {
		return {
			id: this.state.id,
			trackName: this.state.trackName,
			isExplicit: this.state.isExplicit,
	  		isrc: this.state.isrc,
	  		releaseDate: this.state.releaseDate,
	  		additionalCredits: this.state.additionalCredits,
	  		audioFile: this.state.audioFile,
	  		selectedGenres: this.state.selectedGenres ? 
	  			[].concat(this.state.selectedGenres) : null,
	  		lyrics: this.state.lyrics
		};
	},
	componentDidMount: function() {
		stemApi.getAllTagTypes()
			.then(function(res) {
				var genreTag = res.find(function(item) {
					return item.systemType === Tag.SystemType.Genre;
				});

				this.setState({
					genreTag: genreTag
				});

				return stemApi.getTagValues({
					tagTypeId: genreTag.id
				});

			}.bind(this))
			.then(function(res) {
				this.setState({
					genreTagValues: res
				});

			}.bind(this))
			.catch(function(reason) {
				console.log('Error fetching all tag types: ' + JSON.stringify(reason));
			});

	},
	onAudioChanged: function(file) {
		this.setState({
			audioFile: file
		});
	},
	handleInputChanged(ev) {
		var newState = {};

		newState[ev.target.name] = ev.target.value;
		this.setState(newState);
	},
	genreTagsUpdated: function(selections) {
		this.setState({
			selectedGenres: selections
		});
	},
	onAddClicked: function() {
		// Make a deep copy of our state
		var trackCopy = this.getTrackState();
		
		this.setState({	
			addedTracks: this.state.addedTracks.concat(trackCopy),
			id: null,
			trackName: '',
			trackNumber: 0,
			isExplicit: false,
	  		isrc: '',
	  		releaseDate: '',
	  		additionalCredits: '',
	  		audioFile: null,
	  		selectedGenres: null,
	  		lyrics: ''
		});
	},
	onEditTrack: function(track) {

		this.setState({
			id: track.id,
			trackName: track.trackName,
			isExplicit: track.isExplicit,
	  		isrc: track.isrc,
	  		releaseDate: track.releaseDate,
	  		additionalCredits: track.additionalCredits,
	  		audioFile: track.audioFile,
	  		selectedGenres: track.selectedGenres,
	  		lyrics: track.lyrics
		});

		var index = this.state.addedTracks.indexOf(track);
		this.state.addedTracks.splice(index, 1);

		this.setState({
			addedTracks: [].concat(this.state.addedTracks)
		});
	},
	validate: function(track) {
		// TODO: Implement visual validation later
		return track.trackName && track.trackName.length > 0 && 
		  	track.audioFile && 
		  	track.selectedGenres && track.selectedGenres.length > 0;
	},
	createTracks: function(album, artistName) {
		return Promise.map(this.state.addedTracks, function(track, index) {
			if (!this.validate(track)) {
				return Promise.reject('The track: ' + JSON.stringify(track) + ' is not valid.  Please correct and resubmit');
			}

			if (!track.id) {
				return stemApi.createSong({
					artistName: artistName,
					name: track.trackName,
					trackNumber: index + 1,
					albumId: album.id,
					songFileId: track.audioFile.response.id,
					// NOTE: We currently don't have a field for this
					bpm: 0,
					tagIds: track.selectedGenres.map(function(genreItem) {
						return genreItem.id;
					})
				})
				.then(function(res) {
					track.id = res.id;

					console.log('Track Created: ' + JSON.stringify(res));
					
					return res;
				}.bind(this));
			} else {
				return Promise.resolve();
			}
		}.bind(this));
	},
	render: function() {

		return (
			<div className="submit-track-wrapper">
				<TrackList playerStateVisible="true" tracks={ this.state.addedTracks } onEditTrack={ this.onEditTrack } />

				<div className="submit-track-name col-lg-6">
					<p>Track Name</p>
					<input name="trackName" value={ this.state.trackName } onChange={ this.handleInputChanged } />
					<AudioUpload value={ this.state.audioFile } onAudioChanged={ this.onAudioChanged } />
				</div>
				<div className="col-lg-6">
					<p>ISRC # <a className="info-tags">Whats an ISRC#?</a></p>
					<input name="isrc" value={ this.state.isrc } onChange={ this.handleInputChanged } placeholder="( optional )" />
				</div> 
				<div className="col-lg-6">
					<p>Release Date - MM/DD/YY</p>
					<input name="releaseDate" value={ this.state.releaseDate } onChange={ this.handleInputChanged } placeholder="( optional )" />
				</div>
				<div className="col-lg-6">
					<p>Additionl Credits</p>
					<input name="additionalCredits" value={ this.state.additionalCredits } onChange={ this.handleInputChanged } placeholder="( optional )" />
				</div>
				<div className="genre-tag-selector-wrapper mar-b-md col-lg-12">
					<div className="col-lg-6 pad-l-sm">	
						<TagSelector tag={ this.state.genreTag } tagList={ this.state.genreTagValues } value={ this.state.selectedGenres } onSelectionsChange={ this.genreTagsUpdated } />
					</div>
					<div className="col-lg-6">	
						<TagSelector tag={ this.state.genreTag } tagList={ this.state.genreTagValues } value={ this.state.selectedGenres } onSelectionsChange={ this.genreTagsUpdated } />
					</div>	
				</div>
				<div className="pad-b-sm col-xs-12">
					<p>Lyrics <a className="info-tags"> Why upload lyrics?</a></p>
					<textarea name="lyrics" value={ this.state.lyrics } onChange={ this.handleInputChanged } placeholder="Paste your lyrics here.." />
				</div>
				<div className="explicit-checkbox pad-b-lg col-xs-12 red">
					<input type="checkbox" name="explicit" onChange={ this.handleInputChanged } />
				  	<h5 className="pad-l-sm">EXPLICIT</h5>
				</div> 
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
								<div className="save-state">Save & Close</div>
							</li>
				        </ul>
				    </div> : 
					<div className="submit-btns">
						<div className="submit-btns">
					        <button className="additional-track-btn mar-r-md" onClick={ this.onAddClicked }>
					        	<i className="icon-plus-circled"></i> Add Additional Tracks
					        </button>

					        { this.state.isSubmitting ? <LoadingButton /> : 
						        <button className="btn-primary" onClick={ this.props.onSubmitClicked }>
						        	<i className="icon-ok-circled2"></i> Submit
						        </button>
						    }
				      	</div>
					</div>
				}

				<p className="bg-danger">
					{ this.state.statusMessage }
				</p>
			</div>
		);
	}
});