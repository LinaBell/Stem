var DashboardMain = React.createClass({
  render: function () {
    return (
      <div className="content-vh">
        <Analytics />
        <CreatorPickups />
        <DMA />
        <TopCommunities />
      </div>
    );
  }
});