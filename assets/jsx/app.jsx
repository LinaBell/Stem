var createStore = Redux.createStore;
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

const initialState = {
    isLoggedIn: false,
    displayMenu: false,
    displayFilterMenu: false,
    navItems: ['Home', 'Creator Profile', 'Artist Profile', 'Song List', 'Profile Settings', 'Artist Search', 'Artist Internal', 'Logout'],
    currentPage: 0
};

var reducer = function(state, action) {
  if(state === undefined) {
    return initialState;
  }
  var newState = state;
  switch(action.type) {
    case 'SignIn':
        console.log('SignIn');
        state.isLoggedIn = true;
        console.log('state = ' + JSON.stringify(state));
        //mapStateToProps();
        return state;

    case 'SignOut':
        console.log('SignOut');
        state.isLoggedIn = false;
        console.log('state = ' + JSON.stringify(state));
        return state;

    case 'ShowMenu':
        console.log('ShowMenu');
        newState = Object.assign({}, state, {displayMenu: true});
        console.log('newState = ' + JSON.stringify(newState));
        return newState;

    case 'HideMenu':
        console.log('HideMenu');
        newState = Object.assign({}, state, {displayMenu: false});
        console.log('newState = ' + JSON.stringify(newState));
        return newState;

    case 'GoToPage':
        console.log('GoToPage');
        console.log('action.data = ' + JSON.stringify(action.data));
        newState = Object.assign({}, state, {currentPage: action.data.currentPage, displayMenu: false});
        console.log('newState = ' + JSON.stringify(newState));
        return newState;

    case 'ShowFilterMenu':
        console.log('ShowFilterMenu');
        newState = Object.assign({}, state, {displayFilterMenu: true});
        console.log('newState = ' + JSON.stringify(newState));
        return newState;

    case 'HideFilterMenu':
        console.log('HideFilterMenu');
        newState = Object.assign({}, state, {displayFilterMenu: false});
        console.log('newState = ' + JSON.stringify(newState));
        return newState;

    default: 
        console.log('state = ' + JSON.stringify(state));
        return state;
  }
  return newState;
}

var store = createStore(reducer, initialState);

var AppState = function(state) {
  return {
        isLoggedIn: state.isLoggedIn,
        displayMenu: state.displayMenu,
        displayFilterMenu: state.displayFilterMenu,
        navItems: state.navItems,
        currentPage: state.currentPage
    }
}


//var AppDispatch = function(dispatch) {
//return {
//GoToPage: function(id) {
//console.log('dispatched');
//dispatch({
//pageID: id
//})
//}
//}
//}

var App = React.createClass({
    showMenu: function() {
        store.dispatch({
          type: 'ShowMenu'
        });
    },

    navigate: function(id) {
        console.log('navigate. id = ' + id);
        store.dispatch({
          type: 'GoToPage',
          data: {currentPage: id}
        });
    },

    render: function() {
        var currentPage = this.props.currentPage;
        
        return (
            <div>               
                <nav className="header">
                    <div className="header-content">
                        <div className="header-brand pull-left">         
                            <a onClick={this.navigate.bind(this, 0)} className="brand">
                                Stem
                            </a>
                        </div>
                        <div className="nav header-nav header-right pull-right">
                            <a className="glyphicon glyphicon-search"></a>
                            <a className="glyphicon glyphicon-th-list"></a>
                            <a className="glyphicon glyphicon-bell"></a>
                            <a onClick={this.showMenu} className="dropdown-toggle primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="glyphicon glyphicon-menu-hamburger"></span>
                            </a>                 
                        </div> 
                    </div> 
                </nav>

                <Menu displayMenu={this.props.displayMenu} alignment="right">
                    <div className="menu-content">
                        <MenuHeader imgSrc={this.props.imgSrc} name={this.props.name} url={this.props.url} />
                        { this.props.navItems.map(function(i, index) {
                            return <MenuItem hash={i} meunItemID={index} currentPage={currentPage}>{i}</MenuItem>
                        })}   
                    </div>
                </Menu>

                <div className="wrapper">
                    { this.props.currentPage == 0 ?
                        <h1>
                            {this.props.isLoggedIn ? "hello world" : "goodbye world"}
                        </h1>
                    : null}
                    
                    { this.props.currentPage == 1 ?
                        <div>
                            <CreatorProfile />
                        </div>
                    : null} 
                    
                    { this.props.currentPage == 2 ?
                        <div>
                            <FilterNav displayFilterMenu={this.props.displayFilterMenu} />
                            <ArtistProfile />
                        </div>
                    : null} 
                    
                    { this.props.currentPage == 3 ?
                        <div>
                            <FilterNav displayFilterMenu={this.props.displayFilterMenu} />
                            <SongList />
                        </div>
                    : null} 
                    
                    { this.props.currentPage == 4 ?
                        <div>
                            <ProfileSettings />
                        </div>
                    : null} 

                    { this.props.currentPage == 5 ?
                        <div>
                            <FilterNav displayFilterMenu={this.props.displayFilterMenu} />
                            <ArtistSearch />
                        </div>
                    : null} 

                    { this.props.currentPage == 6 ?
                        <div>
                            <ArtistInternal />
                        </div>
                    : null} 
                </div>
            </div>
        );
    }
});

var Menu = React.createClass({
    hideMenu: function() {
        store.dispatch({
          type: 'HideMenu'
        });
    },

    render: function() {
        return (
            <div>
                <div onClick={this.hideMenu} id="m-overlay" className={(this.props.displayMenu ? "menu-page-overlay active" : "menu-page-overlay")}></div>
                <div className="menu">
                    <div className={(this.props.displayMenu ? "visible " : "") + this.props.alignment}>{this.props.children}</div>
                </div>
            </div>
        );
    }
});

var MenuHeader = React.createClass({
    render: function() {
        return (
            <div className="menu-header">
                <a className="close">X</a>
                <div className="user-info">
                    <img src={this.props.imgSrc} />
                    <h2>{this.props.name}</h2>
                    <a href={this.props.url}>stem.com/smelly</a>
                </div>
            </div>
        );
    }
});

var MenuItem = React.createClass({
    navigate: function(id) {
        store.dispatch({
          type: 'GoToPage',
          data: {currentPage: id, displayMenu: false}
        });
    },

    render: function() {
        return (
            <div onClick={this.navigate.bind(this, this.props.meunItemID)} id={this.props.meunItemID} className={this.props.meunItemID == this.props.currentPage ? "menu-item active" : "menu-item"}>{this.props.children}</div>
        );
    }
});


App = connect(
  AppState
//  AppDispatch
)(App)

ReactDOM.render(
    <div>
        <ReactRedux.Provider store={store}>
            <App imgSrc="http://media.galaxant.com/000/198/679/desktop-1435085753.jpg" name="Smelly Cat" url="http://media3.giphy.com/media/FLAUgfNMvFhXa/giphy.gif" />
        </ReactRedux.Provider>
    </div>,
    document.getElementById('app')
);