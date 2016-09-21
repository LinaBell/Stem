var ArtistProfileTableRow = React.createClass({
	getInitialState: function () {
		return {
	  		red: false
		};
	},
	handleLike: function (event) {
		if (event.currentTarget.className == "icon-heart-empty fa-2x" ) {
	  		event.currentTarget.className = "icon-heart red fa-2x";
		}
  },
	render: function() {
		var song = this.props.song;

		return (
			<tr>
			  <td className="img-td col-xs-1 row no-gutters">
			    <img className="mobile-img-thumbnail mar-r-xs" src={song.albumArtUrl} />
			  </td>
			  <td className="col-xs-1 col-md-2"><p>{song.name}</p></td>
			  <td className="col-xs-1 col-md-2"><p>{song.albumName}</p></td>
			  <td className="col-xs-1"><p>{song.duration}</p></td>
			  <td className="col-xs-1"><p>{song.playCount}</p></td>
			  <td className="col-xs-1"><p><span onClick={this.handleLike} className={ this.state.red ? "icon-heart red fa-2x" : "icon-heart-empty fa-2x"}></span></p></td>
			  <td className="col-xs-1"><p><span className="icon-down-circled fa-2x"></span></p></td>
			</tr>
		);
	}
});