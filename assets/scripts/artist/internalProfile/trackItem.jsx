var TrackItem = React.createClass({
	onEditTrack: function() {
		this.props.onEditTrack(this.props.index);
	},
	render: function() {
		var item = this.props.item;

		return (
			<div className="col-xs-12">
				
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
				{ this.props.isAdmin ? <StatusButtons isReadOnly={ true } value={ item.status } onStatusChange={ this.onStatusChange } /> : null }
				
				<i onClick={ this.onEditTrack } className="icon-edit submit-edit-icon pull-right fa-2x"></i>
			</div>
		);
	}
});