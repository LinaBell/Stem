var AdminNewArtistsChart = React.createClass({
  onTimespanChange: function() {
    stemApi.getArtistSignups({
      days: days
    })
    .then( (res) =>  {

        c3.generate({
            bindto: '.admin-chart',
            data: {
                json: res.map((item, index) => {
                    return{
                        day: index,
                        Artists: item.signUps
                    }
                }),
                keys: {
                    x: 'day',
                    value: ['Artists']
                },
                axis: {
                    y: {
                      label: {
                        text:'# of users',
                        position: 'outer-middle'
                      }
                    }
                }
            }
        })
    });
  },
  render: function() {
    return(
      <div className="admin-chart"></div>
    )
  }
});
