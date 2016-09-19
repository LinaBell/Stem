var SubmitMusicAlbum = React.createClass({
	getInitialState: function() {
		return {
			id: null,
			artistName: '',
			albumName: '',
			upc: '',
			albumArt: null
		};
	},
	componentDidMount: function() {
		if (this.props.albumId) {
			stemApi.getAlbum({
				id: this.props.albumId
			})
			.then((res) => {
				this.setState({
					id: res.id,
					artistName: res.artistName,
					albumName: res.name,
					upc: res.upc,
					albumArt: res.albumArtUrl
				})
			})
			.catch((reason) => {
				console.error('Error fetching the album: ' + Utilities.normalizeError(reason));
			});
		}
	},
	onUpcChange: function(ev) {
		this.setState({
			upc: ev.target.value
		});
	},
	onArtistNameChange: function(ev) {
		this.setState({
			artistName: ev.target.value
		});
	},
	onAlbumNameChange: function(ev) {
		this.setState({
			albumName: ev.target.value
		});
	},
	onAlbumArtChange: function(updatedImage, origImage) {
		// TODO: Use the updated image and not the origImage
		this.setState({
			albumArt: origImage
		});
	},
	validate: function() {
		// TODO: Implement visual validation of controls
		return this.state.artistName && this.state.artistName.length > 0 &&
			this.state.albumName && this.state.albumName.length > 0 &&
			this.state.albumArt;
	},
	createAlbum: function(releaseDate) {
		if (this.state.id) {
			return Promise.resolve({
				id: this.state.id,
				artistName: this.state.artistName,
				albumName: this.state.albumName,
				upc: this.state.upc,
				albumArt: this.state.albumArt
			});
		}

		if (this.validate()) {
			return stemApi.upload({
				file: this.state.albumArt
			})
			.then((res) => {
				return stemApi.createAlbum({
					name: this.state.albumName,
					releaseDate: releaseDate || new Date(),
					artFileId: res.id
				});
				
				// TODO: Here we should lock down the album fields so that they cannot be changed, otherwise
				// the information passed back above could be out of sync
			})
			.then((res) => {
				this.setState({
					id: res.id
				});

				return res;
			});
		} else {
			return Promise.reject('The album is not valid, please add an artist name, album title, and album art');
		}
	},
	render: function() {
		return (
			<div className="submit-album-form pad-box-lg">
				<div className="submit-input-wrapper">
					<p>Artist Name</p>
					<input value={this.state.artistName} onChange={this.onArtistNameChange} />
					<p>Album Name</p>
					<input value={this.state.albumName} onChange={this.onAlbumNameChange} />
					<p>UPC</p>
					<input value={this.state.upc} onChange={this.onUpcChange} placeholder="( optional )" />
				</div>
				<div className="submit-album-img mar-l-lg">
					<ImageUpload width="240" onImageChange={ this.onAlbumArtChange } value={ this.state.albumArt }>
						<div className="upload-album-content">
					  		<i className="icon-picture-1 fa-5x"></i>
					  		<h4 className="pad-b-sm">Upload your album art</h4>
					  		<p>Recommended size: 1000x1000</p>
					  		<p>File Size Limit: xMB</p>
						</div>
					</ImageUpload>
				</div>  
			</div>
		);
	}
});