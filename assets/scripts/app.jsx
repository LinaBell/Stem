var createStore = Redux.createStore,
	combineReducers = Redux.combineReducers,
	applyMiddleware = Redux.applyMiddleware,
	Provider = ReactRedux.Provider,
	connect = ReactRedux.connect,
	stemApi = new StemApi("http://api.dev.hellothematic.com/api/"),
	thunk = ReduxThunk.default;

var TagSystemTypeEnum = new Enum({ 
	None: 0, 
	Genre: 1, 
	Community: 2, 
	Vocal: 3, 
	Tempo: 4, 
	Mood: 5 
});

var SearchTermType = new Enum({
	Text: 0,
	Tag: 1
})

// This should be moved to it's own file at some point
var TrackStatus = {
	Pending: 0,
	Approved: 1,
	Live: 2
};

// This should be moved to it's own file at some point
var Utilities = {
	normalizeError: function(error) {
		if (typeof error === 'string') {
			return error;
		}

		if (typeof error === 'object') {
			// These are jQuery AJAX errors
			if (error.hasOwnProperty('responseJSON')) {
				return error.responseJSON.message;
			}

			// These are Blue Bird errors
			if (error.hasOwnProperty('message')) {
				return error.message;
			}
		}
	},

	getTagIds(tags) {
		return tags.reduce((prev, current) => {
			if (current.type === SearchTermType.Tag) {
				prev.push(current.data.id);
			}
			
			return prev;	
		}, []);
	},

	parseImageUriToBlob(dataUri) {
		var matches =  /^data:(.+?);base64,(.+?)$/.exec(dataUri);
		var mimeType = matches[1];
		var byteString = atob(matches[2]);
    	var data = new Uint8Array(byteString.length);
    	
    	for (var i = 0; i < byteString.length; i++) {
        	data[i] = byteString.charCodeAt(i);
    	}

    	return new Blob([data], { type: mimeType });
	}
};

function refreshTags() {
	return function(dispatch) {
		stemApi.getAllTags()
		.then((res) => {
			dispatch({
				type: 'UpdateTags',
				data: {
					tags: res
				}
			});
		})
		.catch((reason) => {
			console.error('Error in refreshTags: ' + Utilities.normalizeError(reason))
		})
	}
}

/* The structure of the search terms:

{
	text: '',
	type: SearchTermType,
	data: { ... } // Extra data, i.e. The associated tag
}

*/

function beginSearch(searchTerms) {
	return function(dispatch) {
		var searchText = searchTerms.reduce((prev, current) => {
			if (current.type === SearchTermType.Text) {
				return prev + ' ' + current.text;
			} else {
				return prev;
			}
			
		}, '').trim();

		var tagIds = Utilities.getTagIds(searchTerms)

		stemApi.searchSongs({
        	text: searchText,
        	tagIds: tagIds
        })
		.then(function(response) {
			dispatch({
	        	type: 'UpdateSearch',
    	    	data: {
        			results: response.songs,
        			terms: response.terms.map((item) => {
        				return {
        					text: item,
        					type: SearchTermType.Text
        				}
        			}).concat(response.tags.map((item) => {
        				return {
        					text: item.name,
        					type: SearchTermType.Tag,
        					data: item
        				}
        			}))
        		}
        	});

			dispatch({
            	type: 'GoToPage',
            	data: {
            		// We automatically navigate to the artist search page when a search is initiated
            		currentPage: 106
            	}
	    	});
		})
		.catch(function(reason) {
			console.error('Search Error: ' + Utilities.normalizeError(reason));
		});
	};
}

function beginBookmarkRefresh(creatorId) {
	return function(dispatch) {
		stemApi.getCreatorBookmarks({
      		creatorId: creatorId
    	})
		.then(function(res) {
			dispatch({
	        	type: 'UpdateCreatorBookmarks',
    	    	data: {
        			results: res
        		}
        	});
		})
		.catch(function(reason) {
			console.error('Search Error: ' + Utilities.normalizeError(reason));
		});
	};
}

// This should be moved to it's own file at some point
const initialAppState = {
	currentPage: 0,
	pageParams: {},
	searchTerms: [],
	searchResults: [],
	creatorBookmarks: [],
	tags: {},
	playingSongId: null
};
var appReducer = function(state = initialAppState, action) {
	switch (action.type) {
		case 'PlaySong':
			return Object.assign({}, state, {
				playingSongId: action.data.songId
			});
		case 'GoToPage':
			return Object.assign({}, state, {
				pageParams: action.data.pageParams || {},
				currentPage: action.data.currentPage
			});

		case 'UpdateSearch':
			return Object.assign({}, state, {
				searchResults: action.data.results,
				searchTerms: [].concat(action.data.terms)
			});

		case 'UpdateCreatorBookmarks':
			return Object.assign({}, state, {
				creatorBookmarks: action.data.results
			});
		case 'UpdateTags': 
			var tagDict = action.data.tags.reduce((prev, current) => {
				if (!prev[current.typeId]) {
					prev[current.typeId] = []
				}
				
				prev[current.typeId].push(current)

				return prev
			}, {})

			return Object.assign({}, state, {
				tags: tagDict
			});

		default: 
			return state;
	}
	return newState;
}

// This should be moved to it's own file at some point
const initialUserState = {
	userInfo: {},
	isLoggedIn: false
};
var userReducer = function(state = initialUserState, action) {
	switch (action.type) {
		case 'UpdateLoginStatus':
			console.log('UpdateLoginStatus Equality Check (userInfo): ' + (action.data.userInfo === state.userInfo));
			return Object.assign({}, state, {
				isLoggedIn: action.data.isLoggedIn,
				userInfo: action.data.userInfo
			});

		case 'UpdateUserRecord':
			console.log('UpdateUserRecord Equality Check (userInfo): ' + (action.data.userInfo === state.userInfo));
			// TODO:  Object.assign is not supported in IE, we may want to use lodash _.assign for compatibility
			return Object.assign({}, state, {
				userInfo: action.data.userInfo
			});

		default: 
			return state;
	}
	return newState;
}

const reducers = combineReducers({
	appState: appReducer,
	userState: userReducer
});

const logger = reduxLogger();

const store = createStore(reducers,
	applyMiddleware(thunk, logger));

var AppState = function(store) {
	return {
		baseAPI: store.appState.baseAPI,
		isLoggedIn: store.userState.isLoggedIn,
		userInfo: store.userState.userInfo,
		currentPage: store.appState.currentPage,
		pageParams: store.appState.pageParams
	}
}

var App = React.createClass({
	getInitialState: function() {
		return {
			searchVisible: false,
			autofocus: true
		}
	},

	getChildContext() {
		return {
			baseAPI: this.props.baseAPI,
			isLoggedIn: this.props.isLoggedIn,
			userInfo: this.props.userInfo,
			currentPage: this.props.currentPage
		};
	},

	render: function() {
		var currentPage = this.props.currentPage,
			menu = this.props.artistMenu,
			accountType = this.props.userInfo.accountType;

		if (accountType === 'Creator') {
			menu = this.props.creatorMenu;
		} else if (accountType === 'Admin') {
			menu = this.props.adminMenu;
		}

		return (  
			<div>  
				<Header menu={menu} currentPage={this.props.currentPage} />

				{ this.props.currentPage == 0 ?
					<div className="wrapper">
						 <Login /> 
					</div>
				: null }
				
				{ this.props.currentPage == 1 ?
					<div className="wrapper">
						<SubmitMusicMain />
						<Footer />
					</div>
				: null} 

				{ this.props.currentPage == 2 ?
					<div className="wrapper">
						<DashboardMain />
						<Footer />
					</div>
				: null} 
				
				{ this.props.currentPage == 3 ?
					<div className="wrapper">
						<ArtistProfile artistId={this.props.userInfo.id} />
						<Footer />
					</div>
				: null } 

				{ this.props.currentPage == 4 ?
					<div className="wrapper">
						<FilterNav />
						<PlaylistMain />
						<Footer />
					</div>
				: null } 

				{ this.props.currentPage == 5 ?
					<div className="wrapper">
						<ArtistSettings />
						<Footer />
					</div>
				: null }

				{ this.props.currentPage === 6 ? 
					<div className="wrapper">
						<LibraryMain />
						<Footer />
					</div>
				: null }

				{ this.props.currentPage == 10 ?
					<div className="wrapper">
						<FilterNav />
						<CreatorMain />
						<Footer />
					</div>
				: null} 

				{ this.props.currentPage == 11 ?
					<div className="wrapper">
						<CreatorProfileMain creator={this.props.userInfo} />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 13 ?
					<div className="wrapper">
						<CreatorDownloadsMain />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 14 ?
					<div className="wrapper">
						<FilterNav />
						<CreatorSpinHistoryMain creator={this.props.userInfo} />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 15 ?
					<div className="wrapper">
						<ArtistSettings />
						<Footer />
					</div>
				: null} 

				{ this.props.currentPage == 16 ?
					<div className="wrapper">
						<CreatorBookmarkMain creator={this.props.userInfo} />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 17 ?
					<div className="wrapper">
						<FilterNav />
						<StaffPicksMain />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 20 ?
					<div className="wrapper">
						<AdminMain />
						<Footer />
					</div>
				: null} 

				{ this.props.currentPage == 21 ?
					<div className="wrapper">
						<AdminNewCreators />
						<Footer />
					</div>
				: null} 

				{ this.props.currentPage == 22 ?
					<div className="wrapper">
						<AdminNewArtistMain />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 23.3 ?
					<div className="wrapper">
						<AdminNewSubmissions />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 100 ?
					<div className="wrapper">
						<WhoAreYou />
					</div>
				: null} 

				{ this.props.currentPage == 101 ?
					<div className="wrapper">
						<ArtistInternalAnalytics />
					</div>
				: null} 
				
				{ this.props.currentPage == 102 ?
					<div className="wrapper">
						<ArtistDownloadNotice />
					</div>
				: null}

				{ this.props.currentPage == 103 ?
					<div className="wrapper">
						<ArtistEditTrack />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 104 ?
					<div className="wrapper">
						<ArtistSongDetail />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 105 ?
					<div className="wrapper">
						<AdminHeader />
						<AdminSubmitMusic albumId={ this.props.pageParams.albumId } />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 106 ?
					<div className="wrapper">
						<FilterNav />
						<ArtistSearch />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage === 107 ? 
					<div className="wrapper">
						<PromoLandingPageMain />
						<Footer />
					</div>
				: null }

				{ this.props.currentPage === 110 ? 
					<div className="wrapper">
						<ArtistProfile artistId={this.props.pageParams.artistId} />
						<Footer />
					</div>
				: null}

				{ this.props.currentPage == 115 ?
					<div className="wrapper">
						<CreatorProfileMain creator={this.props.pageParams} />
						<Footer />
					</div>
				: null}
			</div>
		);
	}
});

var artistMenu = [
	{
		pageID: 6,
		text: "Home",
		icon: "icon-home"
	},
	{
		pageID: 1,
		text: "Submit Music",
		icon: "icon-up-circle"
	},
	{
		pageID: 2,
		text: "Dashboard",
		icon: "icon-gauge"
	},
	{
		pageID: 3,
		text: "Profile",
		icon: "icon-user"
	},
	{
		pageID: 10,
		text: "Browse Music",
		icon: "icon-headphones-2"
	},
	{
		pageID: 5,
		text: "Account Settings",
		icon: "icon-cog-2"
	},
	{
		pageID: 107,
		text: "Promo Page",
		icon: "icon-star"
	}
]; 

var creatorMenu = [
	{
		pageID: 10,
		text: "Home",
		icon: "icon-home"
	},
	{
		pageID: 11,
		text: "Profile",
		icon: "icon-user"
	},
	{
		pageID: 16,
		text: "Bookmarks",
		icon: "icon-bookmark"
	},
	{
		pageID: 13,
		text: "Downloads",
		icon: "icon-down-circle"
	},
	{
		pageID: 14,
		text: "Spin History",
		icon: " icon-spin3"
	},
	{
		pageID: 15,
		text: "Account Settings",
		icon: "icon-cog-2"
	},
	{
		pageID: 17,
		text: "Staff Picks",
		icon: "icon-group"
	}
]; 

var adminMenu = [
	{
		pageID: 20,
		text: "Admin Dashboard",
	},
	{
		pageID: 21,
		text: "Creators",
	},
	{
		pageID: 22,
		text: "Artists",
	},
	{
		pageID: 23,
		text: "Music Admin",
	},
	{
		pageID: 23.1,
		text: "Approved Music",
		level: 2
	},
	{
		pageID: 23.2,
		text: "Live Music",
		level: 2
	},
	{
		pageID: 23.3,
		text: "Pending Music",
		level: 2
	},
	{
		pageID: 24,
		text: "Top Of...",
	},
	{
		pageID: 24.1,
		text: "Top Downloads",
		level: 2
	},
	{
		pageID: 24.2,
		text: "Top Artists",
		level: 2
	},
	{
		pageID: 24.3,
		text: "Top Creators",
		level: 2
	},
	{
		pageID: 25,
		text: "Settings",
	},
]; 


App.childContextTypes = {
	baseAPI: React.PropTypes.string,
	isLoggedIn: React.PropTypes.bool,
	userInfo: React.PropTypes.object,
	currentPage: React.PropTypes.number
};

App = connect(
	AppState
)(App)

ReactDOM.render(
	<div>
		<ReactRedux.Provider store={store}>
			<App artistMenu={artistMenu} creatorMenu={creatorMenu} adminMenu={adminMenu} />
		</ReactRedux.Provider>
	</div>,
	document.getElementById('app')
);