var LibraryMain = React.createClass({
  render: function() {
    return(
      <div className="artist-internal-wrapper mar-t-sm">
        <div className="col-xs-3">
          <ArtistInternalSideBar />
        </div>
        <div className="pad-box-lg col-auto bg-white">  
          <div className="artist-internal-greeting bg-white">
            <h3>Submit Music</h3>
            <p>Add music to your library</p>
          </div>
          <div className="btn-wrapper pull-right pad-t-lg pad-r-lg">
            <button type="button" className="btn-primary"><h3><span className="icon-up-circled"></span> Submit Music</h3></button>
          </div>
          <div className="library-filter">
            <ul className="pad-t-md">
              <li><h4>All</h4></li>
              <li><h4>Approved</h4></li>
              <li><h4>Pending</h4></li>
              <li><h4>Disabled</h4></li>
              <li><h4>Rejected</h4></li>
            </ul>
          </div>
          <LibraryResultTable />
        </div>  
      </div>
    )
  }
});