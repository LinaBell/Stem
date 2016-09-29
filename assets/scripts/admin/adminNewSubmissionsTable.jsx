var AdminNewSubmissionsTable = React.createClass({
  render: function() {
    var artists = this.props.artists
    return(
      <div className="admin-table row pad-b-lg">
        <table className="col-xs-12">
          <thead className="admin-table-header">
            <tr>
              <th className="col-xs-2">Img</th>
              <th className="col-xs-2">Artist<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-2">Song Title<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-2">Album<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Time</th>
              <th className="col-xs-2">Submitted<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Edit</th>
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {artists.map(function(artist, index) {
              return (
                <AdminNewSubmissionsTableItem key={index} artist={artist} />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
})

var AdminNewSubmissionsTableItem = React.createClass({
  render: function() {
    var artist = this.props.artist
    return(
      <tr className="mar-b-xs">
        <td className="col-xs-2 img-box">
          <img className="mobile-img-thumbnail" src={artist.albumArtUrl}></img>
        </td>
        <td className="col-xs-2">{artist.artistName}</td>
        <td className="col-xs-2">{artist.name}</td>
        <td className="col-xs-2">{artist.albumName}</td>
        <td className="col-xs-1">{artist.duration}</td>
        <td className="col-xs-2">{artist.submittedDate}</td>
        <td className="col-xs-1"><span className="icon-edit-alt"></span></td>
      </tr>
    )
  }
});