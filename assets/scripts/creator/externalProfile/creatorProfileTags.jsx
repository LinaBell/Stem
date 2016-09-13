var CreatorProfileTags = React.createClass({
  getInitialState: function() {
    return {
      tags: []
    }
  },
  // componentDidMount: function() {
  // },
  render: function() {
    return(
      <div className="creator-profile-tags-wrapper pad-box-md">
        <h4>My Tags</h4>
        <p>How you can find my work</p>
        <ul className="pad-t-md pad-b-lg">
          <li>Beauty</li>
          <li>How to/Lifestyle</li>
          <li>Fashion</li>
          <li>Fitness</li>
          <li>Make up</li>
          <li>Love</li>
        </ul>
      </div>
    )
  }
});