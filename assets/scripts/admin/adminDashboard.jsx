var AdminTimelineNav = React.createClass({
	render: function() {
		return(
			<ul className="timeline-nav mar-t-lg mar-b-lg">
				<li className="mar-l-md">Today</li>
				<li className="mar-l-md">Last 7</li>
				<li className="mar-l-md">Last 30</li>
				<li className="mar-l-md">Last 60</li>
				<li className="mar-l-md">Last 90</li>
				<li className="mar-l-md">Total</li>
			</ul>
		)
	}
});

var AdminDashboard = React.createClass({
	render: function() {
		return(
			<div className="">
				<div className="admin-dashboard">	
					<div className="admin-dashboard-box display-inlb bg-primary pad-box-md">
						<span className="icon icon-videocam fa-4x white pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm">622</h2>
						<h2 className="title mar-b-sm">New Creators</h2>
					</div>
					<div className="admin-dashboard-box display-inlb bg-primary pad-box-md">
						<span className="icon icon-up-circled fa-4x white pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm">226</h2>
						<h2 className="title mar-b-sm">New Submissions</h2>
					</div>
					<div className="admin-dashboard-box display-inlb pad-box-md">
						<span className="icon icon-down-circle fa-4x primary pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm primary">622</h2>
						<h2 className="title mar-b-sm primary">Downloads</h2>
					</div>
					<div className="admin-dashboard-box display-inlb pad-box-md">
						<span className="icon icon-headphones-2 fa-4x primary pull-left mar-t-md"></span>
						<h2 className="stats mar-t-sm mar-b-sm primary">226</h2>
						<h2 className="title mar-b-sm primary">New Artists</h2>
					</div>
					<div className="admin-dashboard-box display-inlb bg-grey-5 pad-box-md">
						<h2 className="large-toolbox-text primary">ACTIVE CREATORS</h2>
					</div>
					<div className="admin-dashboard-box display-inlb bg-grey-5 pad-box-md">
						<h2 className="large-toolbox-text primary">TOP ARTISTS</h2>
					</div>			
				</div>
			</div>
		)
	}
})