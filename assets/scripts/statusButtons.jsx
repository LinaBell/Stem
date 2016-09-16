var StatusButtons = React.createClass({
	selectedClass: 'selected',
	pendingClass: 'pending-state',
	approvedClass: 'approved-state',
	liveClass: 'live-state',

	getInitialState: function() {
		return {
			pendingClass: this.pendingClass,
			approvedClass: this.approvedClass,
			liveClass: this.liveClass
		};
	},
	componentDidMount: function() {
		this.setStatus(this.props.value);
	},
	componentWillReceiveProps: function(nextProps) {
		this.setStatus(nextProps.value);
	},
	setStatus: function(status) {
		if (typeof status !== undefined) {
			switch (status) {
				case TrackStatus.Pending:
					this.setState({
						pendingClass: this.pendingClass + ' ' + this.selectedClass,
						approvedClass: this.approvedClass,
						liveClass: this.liveClass
					});
					break;
				case TrackStatus.Approved:
					this.setState({
						approvedClass: this.approvedClass + ' ' + this.selectedClass,
						pendingClass: this.pendingClass,
						liveClass: this.liveClass
					});
					break;
				case TrackStatus.Live:
					this.setState({
						liveClass: this.liveClass + ' ' + this.selectedClass,
						pendingClass: this.pendingClass,
						approvedClass: this.approvedClass
					});
					break;
			}
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