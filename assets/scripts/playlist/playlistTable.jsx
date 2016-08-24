var PlaylistTable = React.createClass({
	getInitialState: function() {
		return {
			displayPlayer: false,
			displayNotice: false,
			red: false
		}
	},

	showHidePlayer: function() {
		if(this.state.displayPlayer) {
			this.setState({ displayPlayer: false });
		} else {
			this.setState({ displayPlayer: true });
		}
	},

	showHideNotice: function() {
		if(this.state.displayNotice) {
			this.setState({ displayNotice: false });
		} else {
			this.setState({ displayNotice: true });
		}
	},
	handleLike: function (event) {
		if (event.currentTarget.className == "icon-heart-empty fa-2x" ) {
	  		event.currentTarget.className = "icon-heart red fa-2x";
		}
  },
	render: function() {
		var self = this;

		return(
			<div className="playlist-wrapper content">
				<table className="col-xs-12 table no-borders">
					<thead>
						<th className="col-md-3 pad-b-md"><h4>Track/Artist</h4></th>
						<th className="col-md-2 pad-b-md"><h4>Album</h4></th>
						<th className="col-md-1 pad-b-md"><h4>Time</h4></th>
						<th className="col-md-2 pad-b-md"><h4>Downloads</h4></th>
						<th className="col-md-2 pad-b-md"><h4>Loves</h4></th>
						<th className="col-md-2 pad-b-md"><h4>Options</h4></th>
					</thead>
					<tbody>
						<tr>
							<td className="col-md-3">
								<img className="mobile-img-thumbnail mar-r-md" src="https://yt3.ggpht.com/-5VV8GnLPUmA/AAAAAAAAAAI/AAAAAAAAAAA/DymHh0I91f0/s900-c-k-no-rj-c0xffffff/photo.jpg" />
								<div className="playlist-detail-info">
									<h4>Cool Kids</h4>
									<p>Echosmith</p>
								</div> 
							</td>

							<td className="col-md-2">
								<p>Talking Dreams</p>              
							</td>

							<td className="col-md-1">
								<p>3:26</p>              
							</td>

							<td className="col-md-1">
								<p>1,266</p>              
							</td>

							<td className="col-md-2">
								<span onClick={this.handleLike} className={ this.state.red ? "icon-heart red fa-2x" : "icon-heart-empty fa-2x"}></span>            
							</td>

							<td className="col-md-3">
								<a><span className="icon-heart fa-2x"></span></a>
								<a><span className="icon-plus-circle fa-2x"></span></a>
							</td>
						</tr>
						<tr>
							<td className="col-md-3">
								<img className="mobile-img-thumbnail mar-r-md" src="https://yt3.ggpht.com/-5VV8GnLPUmA/AAAAAAAAAAI/AAAAAAAAAAA/DymHh0I91f0/s900-c-k-no-rj-c0xffffff/photo.jpg" />
								<div className="playlist-detail-info">
									<h4>Cool Kids</h4>
									<p>Echosmith</p>
								</div> 
							</td>

							<td className="col-md-2">
								<p>Talking Dreams</p>              
							</td>

							<td className="col-md-1">
								<p>3:26</p>              
							</td>

							<td className="col-md-1">
								<p>1,266</p>              
							</td>

							<td className="col-md-2">
								<span onClick={this.handleLike} className={ this.state.red ? "icon-heart red fa-2x" : "icon-heart-empty fa-2x"}></span>            
							</td>

							<td className="col-md-3">
								<a><span className="icon-heart fa-2x"></span></a>
								<a><span className="icon-plus-circle fa-2x"></span></a>
							</td>
						</tr>
						<tr>
							<td className="col-md-3">
								<img className="mobile-img-thumbnail mar-r-md" src="https://yt3.ggpht.com/-5VV8GnLPUmA/AAAAAAAAAAI/AAAAAAAAAAA/DymHh0I91f0/s900-c-k-no-rj-c0xffffff/photo.jpg" />
								<div className="playlist-detail-info">
									<h4>Cool Kids</h4>
									<p>Echosmith</p>
								</div> 
							</td>

							<td className="col-md-2">
								<p>Talking Dreams</p>              
							</td>

							<td className="col-md-1">
								<p>3:26</p>              
							</td>

							<td className="col-md-1">
								<p>1,266</p>              
							</td>

							<td className="col-md-2">
								<span onClick={this.handleLike} className={ this.state.red ? "icon-heart red fa-2x" : "icon-heart-empty fa-2x"}></span>            
							</td>

							<td className="col-md-3">
								<a><span className="icon-heart fa-2x"></span></a>
								<a><span className="icon-plus-circle fa-2x"></span></a>
							</td>
						</tr>
						<tr>
							<td className="col-md-3">
								<img className="mobile-img-thumbnail mar-r-md" src="https://yt3.ggpht.com/-5VV8GnLPUmA/AAAAAAAAAAI/AAAAAAAAAAA/DymHh0I91f0/s900-c-k-no-rj-c0xffffff/photo.jpg" />
								<div className="playlist-detail-info">
									<h4>Cool Kids</h4>
									<p>Echosmith</p>
								</div> 
							</td>

							<td className="col-md-2">
								<p>Talking Dreams</p>              
							</td>

							<td className="col-md-1">
								<p>3:26</p>              
							</td>

							<td className="col-md-1">
								<p>1,266</p>              
							</td>

							<td className="col-md-2">
								<span onClick={this.handleLike} className={ this.state.red ? "icon-heart red fa-2x" : "icon-heart-empty fa-2x"}></span>            
							</td>

							<td className="col-md-3">
								<a><span className="icon-heart fa-2x"></span></a>
								<a><span className="icon-plus-circle fa-2x"></span></a>
							</td>
						</tr>
						<tr>
							<td className="col-md-3">
								<img className="mobile-img-thumbnail mar-r-md" src="https://yt3.ggpht.com/-5VV8GnLPUmA/AAAAAAAAAAI/AAAAAAAAAAA/DymHh0I91f0/s900-c-k-no-rj-c0xffffff/photo.jpg" />
								<div className="playlist-detail-info">
									<h4>Cool Kids</h4>
									<p>Echosmith</p>
								</div> 
							</td>

							<td className="col-md-2">
								<p>Talking Dreams</p>              
							</td>

							<td className="col-md-1">
								<p>3:26</p>              
							</td>

							<td className="col-md-1">
								<p>1,266</p>              
							</td>

							<td className="col-md-2">
								<span onClick={this.handleLike} className={ this.state.red ? "icon-heart red fa-2x" : "icon-heart-empty fa-2x"}></span>            
							</td>

							<td className="col-md-3">
								<a><span className="icon-heart fa-2x"></span></a>
								<a><span className="icon-plus-circle fa-2x"></span></a>
							</td>
						</tr>
					</tbody>
				</table>

				<a onClick={this.showHidePlayer}>play test</a>
				<br />
				<a onClick={this.showHideNotice}>notice test</a>
				{ this.state.displayPlayer ? <Player /> : null }
				{ this.state.displayNotice ? <ArtistDownloadNotice showHideNotice={self.showHideNotice} /> : null }
			</div>
		)
	}
});