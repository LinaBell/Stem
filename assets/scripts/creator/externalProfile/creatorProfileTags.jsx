var CreatorProfileTags = React.createClass({
  getInitialState: function() {
    return {
      tags: []
    }
  },
  componentDidMount: function() {
    stemApi.getCreatorProfile({
      creatorId: this.props.creator.id
    })
    .then(function(res) {
      this.setState({tags: res.tags });
    }.bind(this), function(error) {
      console.error('Creator Profile Error: ' + JSON.stringify(error));
    });
  },
  render: function() {
    var tags = this.state.tags;
    return(
      <div className="creator-profile-tags-wrapper pad-t-md pad-b-md">
        <h3>My Tags</h3>
        <p>How you can find my work</p>
        <ul className="pad-t-md pad-b-lg">
          {tags.map((tag, index) => {
            return (
              <CreatorTags key={index} tag={tag} />
            )
          })}
        </ul>
      </div>
    )
  }
});

var CreatorTags = React.createClass({

  render: function() {
  var tag = this.props.tag;

    return (
      <li>{tag.name}</li>
    )
  }
});