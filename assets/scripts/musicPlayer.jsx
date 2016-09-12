var MusicPlayer = React.createClass({
	getInitialState: function () {
	    return {
	        playing: false,
	        pos: 0
	    };
	},
	handleTogglePlay: function () {
    	this.setState({
    		playing: !this.state.playing
    	});
    },
    handlePosChange: function (e) {
    	this.setState({
      	 	pos: e.originalArgs[0]
    	});
  	},
	render: function() {
		var wavesurfer = WaveSurfer.create({
		    container: '#waveform',
		    scrollParent: true,
		});
	    wavesurfer.load('http://ejb.github.io/progressor.js/demos/echoplex.mp3');
		return(
			<div>
				<div id="waveform" audioFile="" pos={this.state.pos} onPosChange={this.handlePosChange} playing={this.state.playing}>
				</div>
				<button type="button" onClick={this.handleTogglePlay}>PLAY / PAUSE</button>
			</div>
		);
	}
})