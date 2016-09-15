var TopCommunities = React.createClass({
  render: function() {
    return(
      <div className="analytics-box grey-bg-dk pad-box-md col-xs-12 col-sm-4">
        <h2>Top Communities</h2>
        <ul className="pad-t-lg">
          <li className="btn artist-search-tags">Beauty</li>
          <li className="btn artist-search-tags">Fashion</li>
          <li className="btn artist-search-tags">How to/Lifestyle</li>
          <li className="btn artist-search-tags">Fitness</li>
          <li className="btn artist-search-tags">Make Up</li>
          <li className="btn artist-search-tags">Love</li>
        </ul>
      </div>
    )
  }
});