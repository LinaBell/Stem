var ArtistInternalAnalyticsPlays = React.createClass({
  getInitialState: function() {
        return {
          valueArray:
          [
            [ 0, 30],
            [ 75, 50],
            [ 150, 81],
            [ 225, 70],
            [ 300, 120],
            [ 375, 100],
            [ 450, 210],
            [ 525, 170],
            [ 600, 230],
            [ 675, 220],
            [ 750, 245],
            [ 825, 255],
            [ 900, 190]
          ]
        }
    },

  render: function () {
    return (
      <div className="artist-internal-analytics-plays-wrapper col-xs-12 content">
        <div className=" col-lg-12">
          <h3 className="col-sm-3 col-md-3 col-lg-2">Plays</h3>
          <h4 className="col-sm-9 col-md-7 col-lg-3 pull-right"><span className="glyphicon glyphicon-file"></span> Export to Excel CSV <span className="glyphicon glyphicon-chevron-down"></span></h4>
        </div>
        <div className="col-sm-1 col-md-1 col-md-offset-0 col-lg-1 col-lg-offset-1">
          <ul className="artist-internal-analyitics-plays-value-labels col-sm-1 col-md-1 col-lg-1 pull-right">
            <li>2500</li>
            <li>2000</li>
            <li>1500</li>
            <li>1000</li>
            <li>500</li>
            <li>0</li>
          </ul>
        </div>
        <div className="line-chart-wrapper col-md-10 col-lg-10">
          <div className="line-graph-grid-wrapper">
            <div className="line-graph-grid-rows-wrapper">
              <div className="line-graph-grid "></div>
              <div className="line-graph-grid "></div>
              <div className="line-graph-grid "></div>
              <div className="line-graph-grid "></div>
              <div className="line-graph-grid "></div>
            </div>  
            <div className="line-graph-grid-columns-wrapper">
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
              <div className="line-graph-grid-columns"></div>
            </div>
          </div>
          <div>  
            <svg id="line-chart-svg" width="900" height="275" role="img" >
              <polyline className="line-chart " points={
              this.state.valueArray.map(function(number) {
                return number
              })
            } />
            </svg>
          </div>  
        </div>
        <div className="col-md-9 col-lg-9"> 
          <ul className="line-graph-grid-months">
            <li>9Jan</li>
            <li>12Jan</li>
            <li>15Jan</li>
            <li>18Jan</li>
            <li>21Jan</li>
            <li>24Jan</li>
            <li>27Jan</li>
            <li>30Jan</li>
            <li>2Fev</li>
            <li>5Fev</li>
            <li>8Fev</li>
            <li>11Fev</li>
            <li>14Fev</li>
          </ul>
        </div>
      </div>  
    )
  }
});
