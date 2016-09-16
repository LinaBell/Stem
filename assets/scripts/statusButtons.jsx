var StatusButtons = React.createClass({
	getInitialState: function() {
		return {
			pendingClass: 'pending-state',
			approvedClass: 'approved-state',
			liveClass: 'live-state'
		};
	},
	componentDidMount: function() {
		if (this.props.value) {
			this.setStatus(this.props.value);
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.value) {
			this.setStatus(nextProps.value);
		}
	},
	setStatus: function(status) {
		switch (status) {
			case TrackStatus.Pending:
				this.setState({
					pendingClass: this.state.pendingClass + ' selected'
				});
				break;
			case TrackStatus.Approved:
				this.setState({
					approvedClass: this.state.approvedClass + ' selected'
				});
				break;
			case TrackStatus.Live:
				this.setState({
					liveClass: this.state.liveClass + ' selected'
				});
				break;
		}
	},
	statusChange: function(status) {
		if (this.props.onStatusChange) {
			this.props.onStatusChange(status); 
		}
	},
	render: function() {
		return (
			<div className="btn-group" role="group">    
				<button 
					disabled={ this.props.isReadOnly } 
					onClick={ this.statusChange.bind(this, TrackStatus.Pending) } 
					className={ this.state.pendingClass }>Pending</button>
				<button
					disabled={ this.props.isReadOnly }
					onClick={ this.statusChange.bind(this, TrackStatus.Approved) } 
					className={ this.state.approvedClass }>Approved</button>
				<button 
					disabled={ this.props.isReadOnly }
					onClick={ this.statusChange.bind(this, TrackStatus.Live) } 
					className={ this.state.liveClass }>Live</button>
			</div>
		);
	}
});