var lastAudioInputId = 0;

var AudioUpload = React.createClass({
	getInitialState: function() {
		return {
			audioInputId: 'audioInputId-' + lastAudioInputId++,
			isUploading: false
		};
	},
	componentWillReceiveProps: function(nextProps) {
		if (this.props.value && !nextProps.value) {
			this.refs.fileInput.value = '';
		}
	},
	getId: function() {
		return this.props.audioInputId || this.state.audioInputId;
	},
	handleFileSelect: function(ev) {
		// To avoid a warning from React about synthetic event reuse
		ev.persist();

		this.setState({
			isUploading: true
		});

		stemApi.upload({
			file: ev.target.files[0]
		})
		.then(function(response) {
			var fileInfo = {
				data: { 
					name: ev.target.files[0].name,
					size: ev.target.files[0].size
				},
				response: response
			};
			
			if (this.props.onAudioChanged) {
				this.props.onAudioChanged(fileInfo);
			}
		}.bind(this))
		.catch(function(error) {
			console.error('Audio Upload Error: ' + JSON.stringify(error));
		})
		.finally(function() {
			this.setState({
				isUploading: false
			});
		}.bind(this));
	},
	reset: function(deleteFile) {

		if (deleteFile) {
			stemApi.cancelUpload({
				id: this.props.value.response.id
			})
			.catch(function(error) {
				console.error('Error occurred while canceling upload: ' + JSON.stringify(error));
			});
		}

		if (this.props.onAudioChanged) {
			this.props.onAudioChanged(null);
		}
	},
	render: function() {
		// This hides the input without removing it from the page
		var fileInputStyles = {
			width: '0.1px',
			height: '0.1px',
			opacity: '0',
			overflow: 'hidden',
			position: 'absolute',
			zIndex: '-1'
		};

		var element = <label htmlFor={ this.getId() } className="btn-primary">Browse for file</label>;

		if (this.state.isUploading) {
			element = <LoadingButton />;
		} else if (this.props.value) {
			var file = this.props.value.data;
			var fileLabel = Formatter.formatFileLabel(file);
			element = <div className="loaded-track pull-right"><p>{ fileLabel }</p> 
        			  <i onClick={ this.reset.bind(this, true) } className="icon-cancel pull-right"></i></div> ;
		}

		return (
			<div className="upload-browse-btn-wrapper pull-right">
				{ /* This element is always hidden */ }
				<input ref="fileInput" id={ this.getId() } type="file" style={ fileInputStyles } accept="audio/*"
					onChange={ this.handleFileSelect } />
				
				{ element }
        	</div>
		);
	}
});