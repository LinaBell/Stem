var SubmitTrackConfirm = React.createClass({
	componentDidMount() {
		$(this.refs.content).dialog({
			dialogClass: 'no-close',
			autoOpen: false,
			modal: true,
			buttons: {
				'Accept': () => {
					$(this.refs.content).dialog('close')
					this.props.onConfirmed();
				},
				'Reject': () => {
					// TODO: Do whatever reject does here
				}
			}
		})
	},
	componentWillReceiveProps(nextProps) {
		if (!this.props.show && nextProps.show) {
			$(this.refs.content).dialog('open')
		}
	},
	render() {
		return (
			<div ref="content">
				You have successfully uploaded a song
			</div> 
		)
	}
})