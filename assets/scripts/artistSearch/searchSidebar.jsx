var ArtistSearchSideBar = ReactRedux.connect(function(state) {		
		return {
			tagList: state.appState.searchTerms
		};
	}, function(dispatch) {
		return {
			removeTag: function(tag) {
				var newTagList = this.tagList.filter(function(item) {
					return item !== tag;
				});

				dispatch(beginSearch(newTagList.join(' ')));
			}
		};
	})(React.createClass({
		render: function() {
			var tagList = this.props.tagList;

			return (
				<span>
					{ tagList.length > 0 ? 
						<ul className="artist-search-tags-list col-xs-12">
	                        { tagList.map(function(item, index) {
								return (
									<li key={index} value={index}>
										<button onClick={this.props.removeTag.bind(this.props, item)} className="btn artist-search-tags">
											<h4>{ item } <span className="icon-cancel-circled"></span></h4>
										</button>
									</li>
								);
	                        }.bind(this)) }
	                    </ul>
	                : null }
				</span>  
			)
		}
}));