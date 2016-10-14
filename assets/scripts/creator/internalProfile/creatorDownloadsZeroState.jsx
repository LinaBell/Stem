var CreatorDownloadsZeroState = ReactRedux.connect(function(state) {
	return {
		currentPage: state.appState.currentPage
	};
})(React.createClass({
	navigate: function() {
		store.dispatch({
			type: 'GoToPage',
			data: { currentPage: 17 }
		});
	},
	render: function () {
		return(
			<div className="zero-state">
				<img className="zero-state-svg mar-b-lg" src="assets/images/chat.svg"/>
				<h3>It looks like you haven't downloaded any music yet. Might we suggest this <a><i className="primary" onClick={this.navigate} >Staff Picks list</i></a>? Want to find a specific artist here? <a className="primary">Email</a> us your suggestions!</h3>
			</div>
		)
	}
}));
