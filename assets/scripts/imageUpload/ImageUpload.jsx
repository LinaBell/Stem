var ImageUpload = React.createClass({
	getInitialState: function() {
		return {
			imageLoaded: false,
			originalImage: null
		};
	}, 
	componentDidMount: function() {
		$(this.refs.imageElement).cropper({
			viewMode: 3,
			guides: false,
			center: true,
			background: false,
			movable: false,
			rotatable: false,
			zoomable: false,
			aspectRatio: 1
		}).on('crop.cropper', this.onImageCropped);
	},

	onImageCropped: function(ev) {
		var imageData = $(ev.target)
			.cropper('getCroppedCanvas')
			.toDataURL();

		var base64File = {
			name: this.state.originalImage.name,
			data: this.parseImageUriToBlob(imageData)
		}

		this.props.onImageChange(base64File, this.state.originalImage);
	},

	// We write our own parsing function because .toBlob is not cross-browser compatible and this seems to be
	parseImageUriToBlob: function(dataUri) {
		var matches =  /^data:(.+?);base64,(.+?)$/.exec(dataUri);
		var mimeType = matches[1];
		var byteString = atob(matches[2]);
    	var data = new Uint8Array(byteString.length);
    	
    	for (var i = 0; i < byteString.length; i++) {
        	data[i] = byteString.charCodeAt(i);
    	}

    	return new Blob([data], { type: mimeType });
	},

	componentWillReceiveProps: function(nextProps) {

		if (nextProps.value) {
			this.setState({
				imageLoaded: true
			});
		}
	},
	componentWillUnmount: function() {
		$(this.refs.imageElement).cropper('destroy');
	},
	
	onFileChange: function(ev) {
		var fileReader = new FileReader(),
			file = ev.target.files[0];
		
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				var cropperEl = $(this.refs.imageElement);
				cropperEl.cropper('replace', fileReader.result);
				this.setState({
					imageLoaded: true,
					originalImage: file
				});
			}
		}
	},

	render: function() {
		// The maxWidth style is important for the image cropper control, remove at your own risk
		var imageStyles = {
			maxWidth: '100%',
			display: this.state.imageLoaded ? 'initial' : 'none'
		};

		var imageSource = this.props.value;
		if (typeof imageSource !== 'string') {
			imageSource = null;
		}

		return (
			<div>
				<img ref="imageElement" style={ imageStyles } src={ imageSource } />
				{ !this.state.imageLoaded ? this.props.children : null }
				<input onChange={ this.onFileChange } type="file" accept="image/*" />
			</div>
		);
	}
});

