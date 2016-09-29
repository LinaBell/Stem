var AdminNewCreatorsChart = React.createClass({
    componentDidMount: function() {
    stemApi.getCreatorSignups({
      days: 1
    })
    .then( (res) =>  {
        c3.generate({
            bindto: '.admin-chart',
            data: {
                json: res.signUps.map((item, index) => {
                    return{
                        day: index,
                        Creators: item.count
                    }
                }),
                keys: {
                    x: 'day',
                    value: ['Creators']
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
  onTimespanChange: function() {
    stemApi.getCreatorSignups({
      days: days
    })
    .then( (res) =>  {
        c3.generate({
            bindto: '.admin-chart',
            data: {
                json: res.signUps.map((item, index) => {
                    return{
                        day: index,
                        Creators: item.signUps.count
                    }
                }),
                keys: {
                    x: 'day',
                    value: ['Creators']
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