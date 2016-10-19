var TrackEditor = React.createClass({
	getInitialState() {
		return {
			isAudioUploading: false,
			trackName: '',
			audioFile: null,
			isrc: '',
			isExplicit: false,
			releaseDate: '',
			additionalCredits: '',
			selectedGenres: null,
			lyrics: '',
			youTubeVideoId: '',
			statusMessage: ''
		}
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.item) {
			var newState = {}
			for (var prop in nextProps.item) {
				newState[prop] = nextProps.item[prop];
			}

			this.setState(newState);
		}
	},

	onInputChange: function(ev) {
		var newState = {};
		newState[ev.target.name] = ev.target.value;

		this.setState(newState);
	},
	onAudioChange: function(file) {
		
		var newState = {
			audioFile: file,
			isAudioUploading: false
		};

		this.setState(newState);
	},

	onUploadStarted() {
		var newState = {
			isAudioUploading: true
		}

		this.setState(newState)
	},
	
	onCheckedChange: function(ev) {		
		var newState = {};
		newState[ev.target.name] = ev.target.checked;

		this.setState(newState);
	},
	onGenresChange: function(selections) {
		var newState = {
			selectedGenres: selections
		};

		this.setState(newState);
	},
	onStatusChange: function(status) {
		var newState = {
			status: status
		};

		this.setState(newState);
	},
	onSave() {
		this.props.onSave(Object.assign({}, this.state))
	},
	render: function() {

		return (
			<div className="submit-track-wrapper col-xs-12">
				<div className="submit-track-name col-lg-6 row no-gutters">
					<p className="col-xs-12">Track Name</p>
					<div className="col-xs-12 row no-gutters no-margin">
						<div className="col-xs-9">
							<input name="trackName" value={ this.state.trackName } onChange={ this.onInputChange } />
						</div>
						<div className="col-xs-2 col-xs-offset-1">
							<AudioUpload value={ this.state.audioFile } onUploadStarted={ this.onUploadStarted } onAudioChange={ this.onAudioChange } />
						</div>
					</div>	
				</div>
				<div className="col-lg-6">
					<p>ISRC # <a className="info-tags">Whats an ISRC#?</a></p>
					<input name="isrc" value={ this.state.isrc } onChange={ this.onInputChange } placeholder="optional" />
				</div> 
				<div className="col-lg-6">
					<p>Release Date - MM/DD/YY</p>
					<input name="releaseDate" value={ this.state.releaseDate } onChange={ this.onInputChange } placeholder="optional" />
				</div>
				<div className="col-lg-6">
					<p>Additional Credits</p>
					<input name="additionalCredits" value={ this.state.additionalCredits } onChange={ this.onInputChange } placeholder="optional" />
				</div>
				<div className="genre-tag-selector-wrapper mar-b-md col-lg-12">
					<div className="col-lg-6 pad-l-sm">	
						<TagSelector 
							tag={ this.props.genreTag } 
							tagList={ this.props.genreTagValues } 
							onSelectionsChange={ this.onGenresChange }
							values={ this.state.selectedGenres } />
					</div>	
					<div className="col-lg-6">
						<p>YouTube Share Link</p>
						<input name="youTubeVideoId" value={ this.state.youTubeVideoId } onChange={ this.onInputChange } placeholder="optional" />
					</div>
				</div>
				<div className="pad-b-sm col-xs-12">
					<p>Lyrics <a className="info-tags"> Why upload lyrics?</a></p>
					<textarea name="lyrics" value={ this.state.lyrics } onChange={ this.onInputChange } placeholder="Paste your lyrics here.." />
				</div>
				<div className="explicit-checkbox col-xs-12">
					<input type="checkbox" name="isExplicit" onChange={ this.onCheckedChange } checked={ this.state.isExplicit } />
				  	<h5 className="pad-l-sm red">EXPLICIT</h5>
				</div>
				{ this.props.isAdmin ? 
					<StatusButtons isReadOnly={ false } value={ this.state.status } onStatusChange={ this.onStatusChange } /> : null 
				}

				<button className="btn-primary pull-right mar-t-md mar-b-md mar-r-sm" onClick={ this.onSave }>Save</button>
				<p className="bg-danger">
					{ this.props.trackStatusMessage }
				</p>
			</div>
		);
	}
});