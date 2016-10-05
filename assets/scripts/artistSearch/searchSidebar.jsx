var ArtistSearchSideBar = ReactRedux.connect(function(state) {		
		return {
			searchTerms: state.appState.searchTerms
		};
	}, function(dispatch) {
		return {
			removeTerm: function(term) {
				var newSearchTerms = this.searchTerms.filter((item) => {
					return item.text !== term.text && item.type === term.type;
				});

				dispatch(beginSearch(newSearchTerms));
			}
		}
	})(React.createClass({
		render: function() {
			var searchTerms = this.props.searchTerms;

			return (
				<span className={ searchTerms.length <= 0 ? "display-false" : "display-true"}>
					{ searchTerms.length > 0 ? 
						<ul className="artist-search-tags-list col-xs-12">
	                        { searchTerms.map((item, index) => {
								return (
									<li key={index} value={index}>
										<button onClick={this.props.removeTerm.bind(this.props, item)} className="btn artist-search-tags">
											<h4>{ item.text } <span className="icon-cancel-circled"></span></h4>
										</button>
									</li>
								);
	                        }) }
	                    </ul>
	                : null }
				</span>  
			)
		}
}));