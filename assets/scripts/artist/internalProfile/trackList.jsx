var TrackList = React.createClass({
	// This function exists to be a handoff between this component and whomever is consuming this component so that
	// we deal with the 'this' pointer properly
	onEditTrack: function(item) {
		this.props.onEditTrack(item);
	},
	onDecreaseOrder: function(item) {
		this.props.onDecreaseOrder(item);
	},
	render: function() {
	    return (
			<div className="submit-track-edit-wrapper col-xs-12">
				<p className="order-track">{ this.props.playerStateVisible ? "Order" : null }</p>
				<p>Track Name</p>
				<ul className="tag-list">
					{ this.props.tracks.map(function(item, index) {
						return ( 
							<li key={index} className="pad-b-sm">
								{ this.props.playerStateVisible ? <i onClick={ this.onDecreaseOrder.bind(this, item) } className="icon-down-open fa-2x"></i> : null }
								{ this.props.playerStateVisible ? null : <i className="icon-play-2 primary fa-2x"></i> }

								<span>{ item.trackName }</span>

								<div className="loaded-track mar-l-md">
									{ item.audioFile ? <p>{ Formatter.formatFileLabel(item.audioFile.data) } </p> : 'No file' }
								</div>
								
								<ul className="song-edit-tags">
									{ item.selectedGenres ? 
										item.selectedGenres.map(function(tagItem, index) {
								  			return (<li key={index} className="submit-edit-tag-item">{ tagItem.name }</li>);
										}) : null
								  	}
								</ul>
								{ this.props.playerStateVisible ? null : <div className="live-state submit-track-state pull-right">Live</div> }
								
								<i onClick={ this.onEditTrack.bind(this, item) } className="icon-edit submit-edit-icon pull-right fa-2x"></i>
							</li>
						);
					}.bind(this))}
				</ul>
			</div>
	    );
  	}
});