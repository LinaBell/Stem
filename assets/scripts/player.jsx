var Player = React.createClass({
    getInitialState: function() {
        return {
            displayPlayer: false
        };
    },

    componentDidMount: function() {
        var ap1 = new APlayer({
            element: document.getElementById('player'),
            narrow: false,
            autoplay: false,
            showlrc: false,
            mutex: true,
            theme: '#fff',
            preload: 'metadata',
            music: {
                title: 'Preparation',
                author: 'Hans Zimmer/Richard Harvey',
                url: 'http://devtest.qiniudn.com/Preparation.mp3',
                pic: 'http://devtest.qiniudn.com/Preparation.jpg'
            }
        });
        ap1.on('play', function () {
            console.log('play');
        });
        ap1.on('play', function () {
            console.log('play play');
        });
        ap1.on('pause', function () {
            console.log('pause');
        });
        ap1.on('canplay', function () {
            console.log('canplay');
        });
        ap1.on('playing', function () {
            console.log('playing');
        });
        ap1.on('ended', function () {
            console.log('ended');
        });
        ap1.on('error', function () {
            console.log('error');
        });
        ap1.init();
    },

    render: function() {
        var self = this;

        return (
            <div className="player-container">
                <div id="player" className="player"></div>
            </div>
        );
    }

});
