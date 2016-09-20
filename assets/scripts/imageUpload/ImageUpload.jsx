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
		}).on('crop.cropper', function(ev) {
			var imageData = $(ev.target)
				.cropper('getCroppedCanvas')
				.toDataURL();

			this.props.onImageChange(imageData, this.state.originalImage);
		}.bind(this));
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
	
	handleChangeFile: function(ev) {
		var fileReader = new FileReader(),
			file = ev.target.files[0];
		
		if (file) {
			fileReader.readAsDataURL(file);
			fileReader.onloadend = function() {
				var cropperEl = $(this.refs.imageElement);
				cropperEl.cropper('replace', fileReader.result);
				this.setState({
					imageLoaded: true,
					originalImage: file
				});

			}.bind(this);
		}
	},
	render: function() {
		// The maxWidth style is important for the image cropper control, remove at your own risk
		var imageStyles = {
			maxWidth: '100%',
			display: this.state.imageLoaded ? 'initial' : 'none'
		};

		return (
			<div>
				<img ref="imageElement" style={ imageStyles } src={ this.props.value } />
				{ !this.state.imageLoaded ? this.props.children : null }
				<input onChange={ this.handleChangeFile } type="file" accept="image/*" />
			</div>
		);
	}
});

