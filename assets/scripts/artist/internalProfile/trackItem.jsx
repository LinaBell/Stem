var TrackItem = React.createClass({
	onEditTrack: function() {
		this.props.onEditTrack(this.props.index);
	},
	render: function() {
		var item = this.props.item;

		return (
			<div className="grey-bg-lt pad-t-md">

				<i className="icon-arrow-combo display-indb pad-l-lg fa-2x col-xs-1"></i>
				
				<div className="loaded-trank-name-margin col-xs-2">
 					{ item.trackName }
 				</div>

				<div className="loaded-track mar-l-md mar-b-sm col-xs-2">
					{ item.audioFile ? <p>{ item.audioFile.name } </p> : 'No file' }
				</div>
				
				<ul className="song-edit-tags col-xs-4">
					{ item.selectedGenres ? 
						item.selectedGenres.map(function(tagItem, index) {
				  			return (<li key={ index } className="submit-edit-tag-item">{ tagItem.name }</li>);
						}) : null
				  	}
				</ul>
				{ this.props.isAdmin ? <StatusButtons isReadOnly={ true } value={ item.status } onStatusChange={ this.onStatusChange } /> : null }
				
				<i onClick={ this.onEditTrack } className="icon-edit submit-edit-icon pull-right fa-2x col-xs-1"></i>
			</div>
		);
	}
});