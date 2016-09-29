var PromoLandingPageMain = React.createClass({
	getInitialState: function() {
		return {
			song: null,
			artist: null
		}
	},
	componentDidMount: function() {
		var newState = { song: null, artist: null }

		stemApi.getSong({
			id: 4
		})
		.then((res) => {
			newState.song = res;
			return stemApi.getArtist({
				id: res.artistId
			})
		})
		.then((res) => {
			newState.artist = res;
			this.setState(newState);
		})
		.catch((reason) => {
			console.error('Fetching Song Error: ' + Utilities.normalizeError(reason));
		});
	},
	render: function() {
		return(
			<div className="">
				<PromoLandingHeader />
				<PromoLandingTopSection />
				<div className="promo-landing-main-bottom pad-box-sm">
					<PromoLandingContent artist={this.state.artist} song={this.state.song} />
				</div>
				<div className="">
					<PromoLandingFooter />
				</div>
			</div>
		)
	}
})