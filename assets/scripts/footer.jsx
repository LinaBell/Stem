var Footer = React.createClass({
  render: function() {
    return (
      <div>
        <MusicPlayer />
        <div className="footer-wrapper pad-box-sm">
          <ul>
            <li><a className="brand">Thematic</a></li>
            <li>  
              <div>
                <h5>Made with love in Santa Monica, CA</h5>
                <p>Copyright 2016 - Thematic, Inc.</p>
              </div>
            </li>
            <li className="footer-links">
              <ul>
                <li>FAQ</li>
                <li>Terms/Conds</li>
                <li>Contact Us</li>
              </ul>
            </li>
          </ul>    
        </div>  
      </div>
    )
  }
})