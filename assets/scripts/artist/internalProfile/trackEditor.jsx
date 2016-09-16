var TrackEditor = React.createClass({
	propagateState: function(newState) {
		if (this.props.onChange) {
			this.props.onChange(Object.assign({}, this.state, newState));
		}
	},
	onInputChange: function(ev) {
		var newState = {};
		newState[ev.target.name] = ev.target.value;

		this.setState(newState);
		this.propagateState(newState);
	},
	onAudioChange: function(file) {
		var newState = {
			audioFile: file
		};

		this.setState(newState);
		this.propagateState(newState);
	},
	
	onCheckedChange: function(ev) {		
		var newState = {};
		newState[ev.target.name] = ev.target.value;

		this.setState(newState);
		this.propagateState(newState);
	},
	onGenresChange: function(selections) {
		var newState = {
			selectedGenres: selections
		};

		this.setState(newState);
		this.propagateState(newState);
	},
	onStatusChange: function(status) {
		var newState = {
			status: status
		};

		this.setState(newState);
		this.propagateState(newState);
	},
	render: function() {
		var item = this.props.item;

		return (
			<div className="submit-track-wrapper">
				<div className="submit-track-name col-lg-6">
					<p className="col-xs-12">Track Name</p>
					<input name="trackName" value={ item.trackName } onChange={ this.onInputChange } />
					<AudioUpload value={ item.audioFile } onAudioChange={ this.onAudioChange } />
				</div>
				<div className="col-lg-6">
					<p>ISRC # <a className="info-tags">Whats an ISRC#?</a></p>
					<input name="isrc" value={ item.isrc } onChange={ this.onInputChange } placeholder="( optional )" />
				</div> 
				<div className="col-lg-6">
					<p>Release Date - MM/DD/YY</p>
					<input name="releaseDate" value={ item.releaseDate } onChange={ this.onInputChange } placeholder="( optional )" />
				</div>
				<div className="col-lg-6">
					<p>Additional Credits</p>
					<input name="additionalCredits" value={ item.additionalCredits } onChange={ this.onInputChange } placeholder="( optional )" />
				</div>
				<div className="genre-tag-selector-wrapper mar-b-md col-lg-12">
					<div className="col-lg-6 pad-l-sm">	
						<TagSelector 
							tag={ this.props.genreTag } 
							tagList={ this.props.genreTagValues } 
							onSelectionsChange={ this.onGenresChange }
							values={ item.selectedGenres } />
					</div>	
					<div className="col-lg-6">
						<p>YouTube Share Link</p>
						<input name="youTubeShareLink" value={ item.youTubeShareLink } onChange={ this.onInputChange } placeholder="( optional )" />
					</div>
				</div>
				<div className="pad-b-sm col-xs-12">
					<p>Lyrics <a className="info-tags"> Why upload lyrics?</a></p>
					<textarea name="lyrics" value={ item.lyrics } onChange={ this.onInputChange } placeholder="Paste your lyrics here.." />
				</div>
				<div className="explicit-checkbox pad-b-lg col-xs-12 red">
					<input type="checkbox" name="isExplicit" onChange={ this.onCheckedChange } checked={ item.isExplicit } />
				  	<h5 className="pad-l-sm">EXPLICIT</h5>
				</div>
				{ this.props.isAdmin ? 
					<StatusButtons isReadOnly={ false } value={ item.status } onStatusChange={ this.onStatusChange } /> : null 
				}
			</div>
		);
	}
});