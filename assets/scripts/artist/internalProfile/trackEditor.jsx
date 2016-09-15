var TrackEditor = React.createClass({

	propagateState: function(newState) {
		if (this.props.onChange) {
			this.props.onChange(Object.assign({}, this.state, newState));
		}
	},
	onInputChanged: function(ev) {
		var newState = {};
		newState[ev.target.name] = ev.target.value;

		this.setState(newState);

		this.propagateState(newState);
	},
	onAudioChanged: function(file) {
		var newState = {
			audioFile: file
		};

		this.setState(newState);

		this.propagateState(newState);
	},
	
	onCheckedChanged: function(ev) {		
		var newState = {};
		newState[ev.target.name] = ev.target.value;

		this.setState(newState);

		this.propagateState(newState);
	},
	onGenresChanged: function(selections) {
		var newState = {
			selectedGenres: selections
		};

		this.setState(newState);

		this.propagateState(newState);
	},
	render: function() {
		return (
			<div className="submit-track-wrapper">
				<div className="submit-track-name col-lg-6">
					<p className="col-xs-12">Track Name</p>
					<input name="trackName" value={ this.props.item.trackName } onChange={ this.onInputChanged } />
					<AudioUpload value={ this.props.item.audioFile } onAudioChanged={ this.onAudioChanged } />
				</div>
				<div className="col-lg-6">
					<p>ISRC # <a className="info-tags">Whats an ISRC#?</a></p>
					<input name="isrc" value={ this.props.item.isrc } onChange={ this.onInputChanged } placeholder="( optional )" />
				</div> 
				<div className="col-lg-6">
					<p>Release Date - MM/DD/YY</p>
					<input name="releaseDate" value={ this.props.item.releaseDate } onChange={ this.onInputChanged } placeholder="( optional )" />
				</div>
				<div className="col-lg-6">
					<p>Additional Credits</p>
					<input name="additionalCredits" value={ this.props.item.additionalCredits } onChange={ this.onInputChanged } placeholder="( optional )" />
				</div>
				<div className="genre-tag-selector-wrapper mar-b-md col-lg-12">
					<div className="col-lg-6 pad-l-sm">	
						<TagSelector 
							tag={ this.props.genreTag } 
							tagList={ this.props.genreTagValues } 
							onSelectionsChange={ this.onGenresChanged }
							values={ this.props.item.selectedGenres } />
					</div>	
					<div className="col-lg-6">
						<p>YouTube Share Link</p>
						<input name="youTubeShareLink" value={ this.props.item.youTubeShareLink } onChange={ this.onInputChanged } placeholder="( optional )" />
					</div>
				</div>
				<div className="pad-b-sm col-xs-12">
					<p>Lyrics <a className="info-tags"> Why upload lyrics?</a></p>
					<textarea name="lyrics" value={ this.props.item.lyrics } onChange={ this.onInputChanged } placeholder="Paste your lyrics here.." />
				</div>
				<div className="explicit-checkbox pad-b-lg col-xs-12 red">
					<input type="checkbox" name="isExplicit" onChange={ this.onCheckedChanged } checked={ this.props.item.isExplicit } />
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
					        <button className="additional-track-btn mar-r-md" onClick={ this.props.onAddClicked }>
					        	<i className="icon-plus-circled"></i> Add Tracks
					        </button>

					        { this.props.isLoading ? <LoadingButton /> : 
						        <button className="btn-primary" onClick={ this.props.onSubmitClicked }>
						        	<i className="icon-ok-circled2"></i> Submit
						        </button>
						    }
				      	</div>
					</div>
				}
			</div>
		);
	}
});