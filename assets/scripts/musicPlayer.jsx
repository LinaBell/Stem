var MusicPlayer = React.createClass({
	getInitialState: function() {
		return{
			audioSource: "http://ejb.github.io/progressor.js/demos/echoplex.mp3",
			player: undefined,
			isPlaying: false
		};
	},

	componentDidMount: function() {
		var wavesurfer = WaveSurfer.create({
		    container: '#waveform',
		    height: 110,
		    barWidth: 2,
		    cursorWidth: 2,
		    cursorColor: "rgba(82, 84, 95, 0.5)",
		    scrollParent: true,
		    hideScrollbar: true,
		    waveColor: "#50E3C2",
		    progressColor: "#c9c9c9",
		});
		this.setState({player: wavesurfer});
		wavesurfer.load(this.state.audioSource);
    },

    playPause: function() {
    	var wavesurfer = this.state.player;
    	wavesurfer.playPause();

        if (this.state.isPlaying == false) {
        	$('.icon-pause').css("display", "inline");
        	$('.icon-play').css("display", "none");
            this.setState({isPlaying: true});
        } else {
        	$('.icon-play').css("display", "inline");
        	$('.icon-pause').css("display", "none");
            this.setState({isPlaying: false});
        }
    },

    // playPauseClick: function() {
        // var audio = document.getElementsByTagName('audio')[0];

        // if (audio.paused == true) {
        //     audio.play();
        //     $('.pause').css("display","inline");
        //     $('.play').css("display","none");
        // } else {
        //     audio.pause();
        //     $('.pause').css("display","none");
        //     $('.play').css("display","inline");
        // }
    // },

    // muteClick: function() {
    //     var audio = document.getElementsByTagName('audio')[0];

    //     if (audio.muted == false) {
    //         audio.muted = true;
    //         $('#muted').css("display","inline");
    //         $('#unmuted').css("display","none");
    //     } else {
    //         audio.muted = false;
    //         $('#muted').css("display","none");
    //         $('#unmuted').css("display","inline");
    //     }
    // },

    // volumeChange: function() {
    //     var audio = document.getElementsByTagName('audio')[0];
    //     audio.volume = volumeBar.value;
    // },

	render: function() {
		
		return(
			<div className="promo-song-info">
                <a onClick={this.playPause} className="promo-artist-img-a mar-r-lg">
					<img className="promo-artist-img" src="https://a4-images.myspacecdn.com/images03/33/588cae99266a4ae2a9c49c909b02781c/600x600.jpg"/>
					<span className="play-pause icon-pause"></span>
					<span className="play-pause icon-play"></span>
                </a>
                <div className="right-side-content">
					<h2 className="mar-t-sm">InMemory - Never forget</h2>
					<div id="waveform" className="mar-t-sm mar-b-sm"></div>
					<h3 className="display-inlb">Follow this artist:</h3>
					<FollowThisArtistLinks/>
				</div>
			</div>
		);
	}
})