var FilterNav = React.createClass({
    getInitialState: function() {
        return {
            displayFilterMenu: false,
            windowWidth: 1,
            filterNavWidth: 0,
            filterItemWidth: 120
        };
    },

    componentDidMount: function() {
        var l = $('.filter-nav ul li').length,
            w = $('.filter-nav ul li').width(),
            windowWidth = window.innerWidth,
            filterNavWidth = l * w,
            filterItemWidth = this.state.filterItemWidth;

        if (windowWidth > filterNavWidth) {
            filterItemWidth = windowWidth / l;
        };

        this.setState({
            windowWidth: windowWidth,
            filterNavWidth: filterNavWidth,
            style: {width: filterItemWidth}
        });
    },
    
    moveLeft: function() {
        var w = this.state.filterItemWidth;
        $('.filter-nav ul').animate({
            left: w
        }, "slow", function () {
            $('.filter-nav ul li:last-child').prependTo('.filter-nav ul');
            $('.filter-nav ul').css('left', '');
        });
    },

    moveRight: function() {
        var w = this.state.filterItemWidth;
        $('.filter-nav ul').animate({
            left: -w
        }, "slow", function () {
            $('.filter-nav ul li:first-child').appendTo('.filter-nav ul');
            $('.filter-nav ul').css('left', '');
        });
    },
       
    showHideFilterMenu: function() {
        if(this.state.displayFilterMenu) {
            this.setState({ displayFilterMenu: false });
        } else {
            this.setState({ displayFilterMenu: true });
        }
    },
    
    render: function() {
        var self = this,
            windowWidth = this.state.windowWidth,
            filterNavWidth = this.state.filterNavWidth,
            style = this.state.style;

        return (
            <div>
                <div className="filter-nav">
                    {filterNavWidth > windowWidth ? 
                        <span>
                            <a onClick={this.moveRight} className="filter-nav-next icon-right-open-big"></a>
                            <a onClick={this.moveLeft} className="filter-nav-prev icon-left-open-big"></a>
                        </span>
                    : null }
                    <ul className="filter-nav-list" ref="filterNav">
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu}>
                                <i className="icon-headphones-2"></i>
                                <h6>
                                    Genre
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu}>
                                <i className="icon-chart-1"></i>
                                <h6>
                                    Trending
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu}>
                                <i className="icon-group"></i>
                                <h6>
                                    Community
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu}>
                                <i className="icon-user-pair"></i>
                                <h6>
                                    Vocal Type
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu}>
                                <i className="icon-music-1"></i>
                                <h6>
                                    Tempo
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu}>
                                <i className="icon-smiley"></i>
                                <h6>
                                    Mood
                                </h6>
                            </a>
                        </li>
                    </ul>
                </div>
                <FilterMenu displayFilterMenu={this.state.displayFilterMenu} showHideFilterMenu={self.showHideFilterMenu}>
                    <div className="filter-menu-content">
                        <div className="filter-menu-header">
                            Select Genres 
                        </div>
                        <FilterItem filterId="1">Filter One</FilterItem>
                        <FilterItem filterId="2">Filter Two</FilterItem>
                        <FilterItem filterId="3">Filter Three</FilterItem>
                        <FilterItem filterId="4">Filter Four</FilterItem>
                    </div>
                    <div className="filter-menu-footer">
                        <a onClick={this.showHideFilterMenu}>Apply Filters</a>
                    </div>
                </FilterMenu>
            </div>
        );
    }

});

var FilterMenu = React.createClass({
    showHideFilterMenu: function() {
        this.props.showHideFilterMenu();
    },

    render: function() {
        return (
            <div>
                <div onClick={this.showHideFilterMenu} id="f-overlay" className={(this.props.displayFilterMenu ? "filter-page-overlay active" : "filter-page-overlay")}></div>
                <div className="filter-menu">
                    <div className={this.props.displayFilterMenu ? "visible " : ""}>{this.props.children}</div>
                </div>
            </div>
        );
    }
});

var FilterItem = React.createClass({
    toggleFilter: function(filterId) {
        
    },

    render: function() {
        return (
            <div className={this.props.active ? "filter-item active" : "filter-item"} onClick={this.toggleFilter.bind(this, this.props.filterId)}>{this.props.children}</div>
        );
    }
});