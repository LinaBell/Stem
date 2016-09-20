var ErrorPage = React.createClass({
	render: function() {
		return(
			<div className="error-page">
				<div className="error-page-content white text-center pad-box-lg">
					<h2 className="fancy-font mar-b-lg mar-t-sm">Oops!</h2>
					<h4 className="mar-b-md">We're likely still working on what you're looking for...</h4>
					<h4 className="mar-b-lg">Why don't you try heading back to <span>HOME</span> for now and we'll get on fixing this one!</h4>
					<h4>Error 404</h4>
				</div>
			</div>
		)
	}
})