var AdminNewArtistsTable = React.createClass({
  render: function() {
    var artists = this.props.artists
    return(
      <div className="admin-table row pad-b-lg">
        <table className="col-xs-12">
          <thead className="admin-table-header">
            <tr>
              <th className="col-xs-2">Img</th>
              <th className="col-xs-2">Name<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-2">Submissions<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-2">Approved<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Downloads<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-2">#Followers<span className="icon-resize-vertical"></span></th>
              <th className="col-xs-1">Email<span className="icon-resize-vertical"></span></th>
            </tr>
          </thead>
          <tbody className="admin-table-body">
            {artists.map(function(artist, index) {
                return(
                    <NewArtistTableItem key={index} artists={artist} />
                )
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

var NewArtistTableItem = React.createClass({
  render: function() {
    var artist = this.props.artists
    return(
        <tr className="">
            <td className="col-xs-2 pad-t-sm">
              <img className="mobile-img-thumbnail" src={artist.profileImageUrl}></img>
            </td>
            <td className="col-xs-2">{artist.name}</td>
            <td className="col-xs-2">{artist.submissions}</td>
            <td className="col-xs-2">{artist.approved}</td>
            <td className="col-xs-1">{artist.downloads}</td>
            <td className="col-xs-2">{artist.followers}</td>
            <td className="col-xs-1">{artist.email}</td>
        </tr>
    )
  }
});