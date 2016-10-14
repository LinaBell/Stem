var StaffPicksHeader = React.createClass({
  render: function() {
    return(
      <div className="staff-picks-header-wrapper">
        <div className="staff-picks-content pad-box-lg">
          <img className="staff-profile-album" src="http://static.tumblr.com/m1skdlz/C26n8qkur/in-return-cover.jpg" />
          <div className="staff-picks-header-detail">
            <h1>Staff Picks</h1>
            <h4>Check out the latest tracks we're listening to in the office.</h4>
          </div>
          <div>
            <p className="dig pad-t-md">Digging it:</p>
            <ul className="likes-list">
              <li><img src="https://yt3.ggpht.com/-d7PtfRQwIf4/AAAAAAAAAAI/AAAAAAAAAAA/1ltgKwrSdUM/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" /></li>
              <li><img src="http://www.ar-entertainment.com/imagenes/nor/art49_150802104554.jpg" /></li>
              <li><img src="http://farm3.static.flickr.com/2508/5832175427_ce11b771ee_m.jpg" /></li>
              <li><img src="https://s-media-cache-ak0.pinimg.com/736x/c7/a8/30/c7a830fd7b671610e3493eba07353083.jpg" /></li>
              <li><img src="https://static.sched.org/a8/2650395/avatar.jpg.320x320px.jpg?c7d" /></li>
            </ul>
            <div className="likes-list-total"><p>+266</p></div>
          </div> 
        </div>  
        <ul className="staff-header-bg">
          <li><img src="https://s-media-cache-ak0.pinimg.com/736x/26/66/6c/26666cbad6a2b74b4fd1a1b8016ec7ab.jpg" /></li>
          <li><img src="http://illusion.scene360.com/wp-content/uploads/2014/11/computergraphics-album-covers-2014-18.jpg" /></li>
          <li><img src="http://www.whudat.de/images/graffiti_streetart_album_covers_02.jpg" /></li>
          <li><img src="http://illusion.scene360.com/wp-content/uploads/2014/11/computergraphics-album-covers-2014-18.jpg" /></li>
          <li><img src="https://s-media-cache-ak0.pinimg.com/736x/26/66/6c/26666cbad6a2b74b4fd1a1b8016ec7ab.jpg" /></li>
        </ul>
        <div className="staff-picks-overlay"></div>
      </div>
    )
  }
});