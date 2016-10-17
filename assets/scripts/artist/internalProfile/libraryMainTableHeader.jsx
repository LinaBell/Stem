var LibraryMainTableHeader = React.createClass({
	render: function() {
		return (<thead>
            <tr>
              <th className="col-xs-1"> </th>
              <th className="col-xs-1 col-md-2"><h4>Song</h4></th>
              <th className="col-xs-1 col-md-2"><h4>Album</h4></th>
              <th className="col-xs-1"><h4>Time</h4></th>
              <th className="col-xs-1"><h4>Spin</h4></th>
              <th className="col-xs-1"><h4>Uses</h4></th>
              <th className="col-xs-1"><h4>Status</h4></th>
              <th className="col-xs-1"><h4>Edit</h4></th>
            </tr>  
          </thead>
		);
	}
});