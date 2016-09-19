var AdminTimelineNav = React.createClass({
  render: function() {
    return(
      <ul className="timeline-nav mar-t-lg mar-b-lg">
        <li className="mar-l-md">Today</li>
        <li className="mar-l-md">Last 7</li>
        <li className="mar-l-md">Last 30</li>
        <li className="mar-l-md">Last 60</li>
        <li className="mar-l-md">Last 90</li>
        <li className="mar-l-md">Total</li>
      </ul>
    )
  }
});
