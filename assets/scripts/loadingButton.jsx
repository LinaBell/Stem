var LoadingButton = React.createClass({
	render: function() {
		return (
			<div className="loader col-xs-12 pull-right">
				<div className="loader__bar"></div>
				<div className="loader__bar"></div>
				<div className="loader__bar"></div>
				<div className="loader__bar"></div>
				<div className="loader__bar"></div>
				<div className="loader__ball"></div>
			</div>
		);
	}
});