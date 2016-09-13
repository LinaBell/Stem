var CreatorBookmarkMain = ReactRedux.connect(function(state) {
  return {
    creatorId: state.userState.userInfo.id
  };
})(React.createClass({
  getInitialState: function() {
    return {
      songs: []
      // songs: [
      //   {
      //     "id": 1,
      //     "artistId": 1,
      //     "trackNumber": 0,
      //     "artistName": "Bon Jovi",
      //     "name": "You give love",
      //     "releaseDate": "2016-09-07T02:49:54.599Z",
      //     "additionalCredits": "things",
      //     "albumId": "1",
      //     "albumName": "The Hits",
      //     "albumArtUrl": "http://orig00.deviantart.net/12fd/f/2015/243/0/c/albumcoverfor_benprunty_fragments_sylviaritter_by_faith303-d97uftr.png",
      //     "duration": "3:37",
      //     "bpm": 120,
      //     "playCount": 327,
      //     "downloadCount": 10,
      //     "bookmarkCount": 5,
      //     "isBookmarked": true,
      //     "popularity": 7,
      //     "isExplicit": true,
      //     "status": "Pending"
      //   },
      //   {
      //     "id": 1,
      //     "artistId": 2,
      //     "trackNumber": 0,
      //     "artistName": "Nickelback",
      //     "name": "How you remind me",
      //     "releaseDate": "2016-09-07T02:49:54.599Z",
      //     "additionalCredits": "things",
      //     "albumId": "2",
      //     "albumName": "No One likes Us",
      //     "albumArtUrl": "http://www.jokeblogger.com/sites/default/files/category_pictures/Nickelback1370473510.jpg",
      //     "duration": "3:26",
      //     "bpm": 120,
      //     "playCount": 3,
      //     "downloadCount": 1,
      //     "bookmarkCount": 200,
      //     "isBookmarked": true,
      //     "popularity": 2,
      //     "isExplicit": true,
      //     "status": "Pending"
      //   }
      // ]
    }
  },
  componentDidMount: function() {
    stemApi.getCreatorBookmarks({
      creatorId: this.props.creatorId
    })
    .then(function(response) {
      this.setState({ songs: response });
      console.log(this.state.songs, "hi hello");
    }.bind(this), function(error) {
      console.error('Creator Bookmarks Error: ' + JSON.stringify(error));
    });

  },
  render: function() {
    return(
      <div>
        <div className="pad-box-lg">
          <h3>Bookmarks</h3>
          <p>The songs you've liked</p>
        </div>
        {this.state.songs.length <= 0 ? <CreatorDownloadsZeroState /> : <PlaylistTable songs={this.state.songs} /> }  
        
      </div>
    )
  }
}));