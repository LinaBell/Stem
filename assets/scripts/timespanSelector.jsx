var TimespanSelector = React.createClass({
  getInitialState: function() {
    return{
      timeSpan: [1 , 7, 30, 60 , 90, -1],
      selectedIndex: null
    }
  },
  componentDidMount: function() {
    this.props.onChange(this.state.timeSpan[0]);
  },
  setTimespan: function(index){
    this.setState({ selectedIndex: index });
    this.props.onChange(this.state.timeSpan[index]);
  },
  render: function() {
    return(
      <ul className="timeline-nav">
        <li className="mar-l-md" onClick={this.setTimespan.bind(this, 0)}>Today</li>
        <li className="mar-l-md" onClick={this.setTimespan.bind(this, 1)}>Last 7</li>
        <li className="mar-l-md" onClick={this.setTimespan.bind(this, 2)}>Last 30</li>
        <li className="mar-l-md" onClick={this.setTimespan.bind(this, 3)}>Last 60</li>
        <li className="mar-l-md" onClick={this.setTimespan.bind(this, 4)}>Last 90</li>
        <li className="mar-l-md" onClick={this.setTimespan.bind(this, 5)}>Total</li>
      </ul>
    )
  }
});
