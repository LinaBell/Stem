var Analytics = React.createClass({
  render: function() {
    return (
      <div className="artist-dashboard-wrapper col-xs-12 row">
        <div className="dashboard-img-overlay"></div>
        <div className="analytics-wrapper">  
          <div className="analytics-box primary-bg pad-box-md col-xs-12 col-sm-4">
            <h2>Pick Ups</h2>
            <h1>62</h1>
            <h3>Your songs have been used in 62 videos</h3>
          </div>
          <div className="analytics-box grey-bg-md pad-box-md col-xs-12 col-sm-4">
            <h2>Spins</h2>
            <h1>66,226</h1>
            <h3>Your songs have been listened to 66,226 times</h3>
          </div>
          <div className="analytics-box grey-bg-dk pad-box-md col-xs-12 col-sm-4">
            <h2>Click Throughs</h2>
            <h1>662</h1>
            <h3>662 poeple have clicked though to your promotional page</h3>
          </div>
        </div>  
      </div>
    )
  }
});