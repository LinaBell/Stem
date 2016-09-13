var CreatorSpinHistoryMain = React.createClass({
  render: function() {
    return(
      <div>
        <div className="pad-box-lg">
          <h3>Spin History</h3>
          <p>The songs you've listened to recently</p>
        </div>  
        <PlaylistTable />
      </div>
    )
  }
});