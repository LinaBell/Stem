var StaffPicksMain = React.createClass({
  getInitialState: function() {
    return {
      songs: []
    }
  },
  render: function() {
    return(
      <div>
        <StaffPicksHeader />
        <div className="pad-box-lg">
          <PlaylistTable songs={this.state.songs} />
        </div>  
      </div>
    )
  }
});