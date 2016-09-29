var AdminNewCreatorsTable = React.createClass({
  render: function() {
    var creators = this.props.creators
    return(
      <div className="admin-table row pad-b-lg">
        <table className="col-xs-12">
          <thead className="admin-table-header">
            <tr>
              <th className="col-xs-1">Img</th>
              <th className="col-xs-1">Title<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">URL<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Views<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Subscribers<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1"># Videos<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Joined<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">WL<span className="icon-resize-vertical"></span></th>
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {creators.map(function(creator, index) {
              return (
                <AdminNewCreatorsTableItem key={index} creators={creator} />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

var AdminNewCreatorsTableItem = React.createClass({
  render: function() {
    var creator = this.props.creators
    return(
      <tr className="mar-b-xs">
        <td className="col-xs-1 img-box">
          <img className="mobile-img-thumbnail" src={creator.img}></img>
        </td>
        <td className="col-xs-1">{creator.title}</td>
        <td className="col-xs-1">{creator.url}</td>
        <td className="col-xs-1">{creator.views}</td>
        <td className="col-xs-1">{creator.subscribers}</td>
        <td className="col-xs-1">{creator.videos}</td>
        <td className="col-xs-1">{creator.joined}</td>
        <td className="col-xs-1"><input type='checkbox'></input></td>
      </tr>
    )
  }
});