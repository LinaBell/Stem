var createStore = Redux.createStore,
	combineReducers = Redux.combineReducers,
	applyMiddleware = Redux.applyMiddleware,
	Provider = ReactRedux.Provider,
	connect = ReactRedux.connect,
	stemApi = new StemApi("http://52.32.255.104/api/"),
	thunk = ReduxThunk.default;

// This should be moved to it's own file at some point
var Tag = {
	SystemType: {
		Genre: 1
	}
};

// This should be moved to it's own file or use a third party library
var Formatter = {
	formatFileLabel: function(file) {
		if (file) {
			var size =  (file.size / (1000000)).toFixed(2) + ' MB';
			return file.name + ' ' + '(' + size + ')';
		}
	}
};

// This should be moved to it's own file at some point
var Utilities = {
	normalizeError: function(error) {
		if (typeof error === 'string') {
			return error;
		}

		// These are jQuery AJAX errors
		if (typeof error === 'object' && error.hasOwnProperty('responseJSON')) {
			return error.responseJSON.message;
		}

		// These are Blue Bird errors
		if (typeof error === 'object' && error.hasOwnProperty('message')) {
			return error.message;
		}
	}
};

// Thunk Action Creator, for having actions that have side effects such as AJAX calls
function beginSearch(searchTerms) {
	return function(dispatch) {
		stemApi.searchSongs({
            request: {
                text: searchTerms
            }
        })
		.then(function(response) {
			dispatch({
	        	type: 'UpdateSearch',
    	    	data: {
        			results: response.songs,
        			terms: response.terms.join(' ')
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

// This should be moved to it's own file at some point
const initialAppState = {
	baseAPI: 'http://52.32.255.104/api',
	currentPage: 0,
	pageParams: {},
	searchTerms: '',
	searchResults: [],
	tagList: []
};
var appReducer = function(state = initialAppState, action) {
	switch (action.type) {
		case 'GoToPage':
			return Object.assign({}, state, {
				pageParams: action.data.pageParams || {},
				currentPage: action.data.currentPage
			})

		case 'UpdateSearch':
			return Object.assign({}, state, {
				searchResults: action.data.results,
				searchTerms: action.data.terms
			})

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

		if(accountType == 'Creator') {
			menu = this.props.creatorMenu;
		} else if(accountType == 'Admin') {
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
						<ArtistInternalAnalytics />
						<Footer />
					</div>
				: null} 
				
				{ this.props.currentPage == 3 ?
					<div className="wrapper">
						<ArtistProfile />
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
						<CreatorProfileMain />
						<Footer />
					</div>
				: null} 

				{ this.props.currentPage == 20 ?
					<div className="wrapper">
						<AdminMain />
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
						<AdminSubmitMusic />
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

				{ this.props.currentPage === 110 ? 
					<div className="wrapper">
						<ArtistProfile artistId={this.props.pageParams.artistId} />
						<Footer />
					</div>
				: null}

			</div>
		);
	}
});

var artistMenu = [
	{
		pageID: 0,
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
		pageID: 4,
		text: "Browse Music",
		icon: "icon-headphones-2"
	},
	{
		pageID: 5,
		text: "Account Settings",
		icon: "icon-cog-2"
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
		pageID: 12,
		text: "Loved",
		icon: "icon-heart"
	},
	{
		pageID: 13,
		text: "Downloads",
		icon: "icon-down-circle"
	},
	{
		pageID: 14,
		text: "Spin History",
		icon: "icon-down-circle"
	},
	{
		pageID: 15,
		text: "Account Settings",
		icon: "icon-cog-2"
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