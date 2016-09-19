var TrackItem = React.createClass({
	onEditTrack: function() {
		this.props.onEditTrack(this.props.index);
	},
	onIncreaseOrder: function() {
		this.props.onIncreaseOrder(this.props.index);
	},
	render: function() {
		var item = this.props.item;

		return (
			<div>
				{ this.props.isAdmin ? null : <i onClick={ this.onIncreaseOrder } className="icon-down-open fa-2x"></i> }
				{ this.props.isAdmin ? <i className="icon-play-2 primary fa-2x"></i> : null }

				<span className="loaded-track-name"><p>{ item.trackName }</p></span>

				<div className="loaded-track mar-l-md">
					{ item.audioFile ? <p>{ Formatter.formatFileLabel(item.audioFile.data) } </p> : 'No file' }
				</div>
				
				<ul className="song-edit-tags">
					{ item.selectedGenres ? 
						item.selectedGenres.map(function(tagItem, index) {
				  			return (<li key={ index } className="submit-edit-tag-item">{ tagItem.name }</li>);
						}) : null
				  	}
				</ul>
				{ this.props.isAdmin ? null : <div className="live-state submit-track-state pull-right">Live</div> }
				
				<i onClick={ this.onEditTrack } className="icon-edit submit-edit-icon pull-right fa-2x"></i>
			</div>
		);
	}
});