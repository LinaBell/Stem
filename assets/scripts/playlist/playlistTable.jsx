var PlaylistTable = ReactRedux.connect(null, function(dispatch) { 
	return {
		// navigateToCreatorProfile: function() {
		// 		dispatch({
		// 			type: 'GoToPage',
		// 			data: {
		// 				currentPage: 115,
		// 				pageParams: { creatorId: 5 }
		// 			}
		// 		});
		// 	}
		};
	})
(React.createClass({
	getInitialState: function() {
		return {
			displayPlayer: false,
			displayNotice: false,
			displayEdit: false,
			displayAdmin: false,
			displayArtistTaggedSuccess: false,
			displayUploadSuccess: false,
			displaySongDetail: false,
			displayCreatorDownloadsMain: false,
			bookMarked: false
		}
	},
	// componentDidMount: function() {
	// 	this.setState({ songs: this.props.creator });
	// 	console.log(this.state.songs, "hi hello");
	// },

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
	showHideEdit: function() {
		if(this.state.displayEdit) {
			this.setState({ displayEdit: false });
		} else {
			this.setState({ displayEdit: true });
		}
	},	
	showHideAdminDashboard: function() {
		if(this.state.displayAdminDashboard) {
			this.setState({ displayAdminDashboard: false });
		} else {
			this.setState({ displayAdminDashboard: true });
		}
	},
	showHideArtistTaggedSuccess: function() {
		if(this.state.displayArtistTaggedSuccess) {
			this.setState({ displayArtistTaggedSuccess: false });
		} else {
			this.setState({ displayArtistTaggedSuccess: true });
		}
	},
	showHideUploadSuccess: function() {
		if(this.state.displayUploadSuccess) {
			this.setState({ displayUploadSuccess: false });
		} else {
			this.setState({ displayUploadSuccess: true });
		}
	},
	showHidePaymentProcessingPage: function() {
		if(this.state.displayPaymentProcessingPage) {
			this.setState({ displayPaymentProcessingPage: false });
		} else {
			this.setState({ displayPaymentProcessingPage: true });
		}
	},
	showHidePaymentOptions: function() {
		if(this.state.displayPaymentOptions) {
			this.setState({ displayPaymentOptions: false });
		} else {
			this.setState({ displayPaymentOptions: true });
		}
	},
	showHideWelcomeModal: function() {
		if(this.state.displayWelcomeModal) {
			this.setState({ displayWelcomeModal: false });
		} else {
			this.setState({ displayWelcomeModal: true });
		}
	},
	showHideCreatorProfile: function() {
		if(this.state.displayCreatorProfile) {
			this.setState({ displayCreatorProfile: false });
		} else {
			this.setState({ displayCreatorProfile: true });
		}
	},
	showHideCreatorDownloadsMain: function() {
		this.setState({
			displayCreatorDownloadsMain: !this.state.displayCreatorDownloadsMain
		});
	},
	showHideSongDetail: function() {
		if(this.state.displaySongDetail) {
			this.setState({ displaySongDetail: false });
		} else {
			this.setState({ displaySongDetail: true });
		}
	},
	handleLike: function (event) {
		if (event.currentTarget.className == "icon-bookmark-empty fa-2x" ) {
	  		event.currentTarget.className = "icon-bookmark-2 primary fa-2x";
		}
  },
	render: function() {
		var songs = this.props.songs;

		return(
			<div className="playlist-wrapper pad-l-lg pad-r-lg pad-b-lg">
				<table className="col-xs-12 table no-borders">
					<thead>
						<tr>
							<th className="col-md-3 pad-b-md"><h4>Track/Artist</h4></th>
							<th className="col-md-2 pad-b-md"><h4>Album</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Time</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Downloads</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Lift</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Bookmark</h4></th>
							<th className="col-md-1 pad-b-md"><h4>Download</h4></th>
						</tr>	
					</thead>
					<tbody>
						{songs.map(function(songs, index) {
							return (
								<PlaylistItems key={index} songs={songs} />
							)
						})}
					</tbody>
				</table>

				<div>
					<a onClick={this.showHidePlayer}>play test</a>
					<br />
					<a onClick={this.showHideNotice}>notice test</a>
					{ this.state.displayPlayer ? <Player /> : null }
					{ this.state.displayNotice ? <ArtistDownloadNotice showHideNotice={self.showHideNotice} /> : null }
					<br />
					<a onClick={this.showHideEdit}>show edit</a>
					{ this.state.displayEdit ? <ArtistEditTrack showHideEdit={self.showHideEdit} /> : null }
					<br />
					<a onClick={this.showHideAdminDashboard}>show admin dashboard</a>
					{ this.state.displayAdminDashboard ? <AdminDashboard showHideAdminDashboard={self.showHideAdminDashboard} /> : null }
					<br />
					<a onClick={this.showHideUploadSuccess}>show upload success</a>
					{ this.state.displayUploadSuccess ? <ArtistUploadSuccess showHideUploadSuccess={self.showHideUploadSuccess} /> : null }
					<br />
					<a onClick={this.showHidePaymentOptions}>show payment options</a>
					{ this.state.displayPaymentOptions ? <PaymentOptions showHidePaymentOptions={self.showHidePaymentOptions} /> : null }
					<br />
					<a onClick={this.showHidePaymentProcessingPage}>show payment processing</a>
					{ this.state.displayPaymentProcessingPage ? <PaymentProcessingPage showHidePaymentProcessingPage={self.showHidePaymentProcessingPage} /> : null }
					<br />
					<a onClick={this.showHideArtistTaggedSuccess}>show tagged success</a>
					{ this.state.displayArtistTaggedSuccess ? <ArtistTaggedSuccess showHideArtistTaggedSuccess={self.showHideArtistTaggedSuccess} /> : null }
					<br />
					<a onClick={this.showHideWelcomeModal}>show welcome</a>
					{ this.state.displayWelcomeModal ? <WelcomeModal showHideWelcomeModal={self.showHideWelcomeModal} /> : null }
					<br />
					<a onClick={this.showHideCreatorDownloadsMain}>show creator downloads</a>
					{ this.state.displayCreatorDownloadsMain ? <CreatorDownloadsMain /> : null }
					<br />
					<a onClick={this.showHideSongDetail}>show song detail</a>
					{ this.state.displaySongDetail ? <ArtistSongDetail showHideSongDetail={self.showHideSongDetail} /> : null }
					<br />
					<a onClick={this.props.navigateToCreatorProfile}>show creator profile</a>
				</div>	
			</div>
		)
	}
}));

var PlaylistItems = React.createClass({
	render: function() {
		var playList = this.props.songs;
		return(
				<tr>
					<td className="col-md-3">
						<img className="mobile-img-thumbnail mar-r-md" src={playList.albumArtUrl} />
						<div className="playlist-detail-info">
							<h4>{playList.name}</h4>
							<p>{playList.artistName}</p>
						</div> 
					</td>

					<td className="col-md-2">
						<p>{playList.albumName}</p>              
					</td>

					<td className="col-md-1">
						<p>{playList.duration}</p>              
					</td>

					<td className="col-md-1">
						<p>{playList.downloadCount}</p>              
					</td>

					<td className="col-md-1">
						<p>{playList.bookmarkCount} <i className="icon-up-open"></i></p>
					</td>

					<td className="col-md-1">
						<span onClick={this.handleLike} className={ playList.isBookmarked ? "icon-bookmark-2 primary fa-2x" : "icon-bookmark-empty fa-2x"}></span>            
					</td>

					<td className="col-md-1">
						<a className="color-grey" ><span className="icon-down-circled fa-2x"></span></a>
					</td>
				</tr>
		)
	}
});