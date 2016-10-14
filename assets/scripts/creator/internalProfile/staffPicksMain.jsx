var StaffPicksMain = React.createClass({
  getInitialState: function() {
    return {
      songs: []
    }
  },
  render: function() {
    return(
      <div className="content-vh">
        <StaffPicksHeader />
        <div className="content-padding">
          <PlaylistTable songs={this.state.songs} />
        </div>  
      </div>
    )
  }
});