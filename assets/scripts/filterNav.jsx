var FilterNav = React.createClass({
    getInitialState: function() {
        return {
            displayFilterMenu: false,
            tagType: TagSystemTypeEnum.None,
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
        }, 'slow', function () {
            $('.filter-nav ul li:last-child').prependTo('.filter-nav ul');
            $('.filter-nav ul').css('left', '');
        });
    },

    moveRight: function() {
        var w = this.state.filterItemWidth;
        $('.filter-nav ul').animate({
            left: -w
        }, 'slow', function () {
            $('.filter-nav ul li:first-child').appendTo('.filter-nav ul');
            $('.filter-nav ul').css('left', '');
        });
    },
       
    showHideFilterMenu: function(tagType) {

    	if (!tagType) {
    		this.setState({
    			displayFilterMenu: false
    		})

    		return
    	}

        if (this.state.displayFilterMenu) {
            this.setState({ 
            	displayFilterMenu: false,
            	tagType: tagType
            });
        } else {
            this.setState({ 
            	displayFilterMenu: true,
            	tagType: tagType });
        }
    },
    
    render: function() {
        var windowWidth = this.state.windowWidth,
            filterNavWidth = this.state.filterNavWidth,
            style = this.state.style;

        return (
            <div>
                <div className="filter-nav" ref="filterNav">
                    {filterNavWidth > windowWidth ? 
                        <span>
                            <a onClick={this.moveRight} className="filter-nav-next icon-right-open-big"></a>
                            <a onClick={this.moveLeft} className="filter-nav-prev icon-left-open-big"></a>
                        </span>
                    : null }
                    <ul className="filter-nav-list">
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu.bind(this, TagSystemTypeEnum.Genre)}>
                                <i className="icon-headphones-2"></i>
                                <h6>
                                    Genre
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu.bind(this, TagSystemTypeEnum.Community)}>
                                <i className="icon-group"></i>
                                <h6>
                                    Community
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu.bind(this, TagSystemTypeEnum.Vocal)}>
                                <i className="icon-user-pair mar-r-sm"></i>
                                <h6>
                                    Vocal Type
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu.bind(this, TagSystemTypeEnum.Tempo)}>
                                <i className="icon-music-1"></i>
                                <h6>
                                    Tempo
                                </h6>
                            </a>
                        </li>
                        <li style={style}>
                            <a onClick={this.showHideFilterMenu.bind(this, TagSystemTypeEnum.Mood)}>
                                <i className="icon-smiley"></i>
                                <h6>
                                    Mood
                                </h6>
                            </a>
                        </li>
                    </ul>
                </div>
                <FilterMenu 
                	displayFilterMenu={this.state.displayFilterMenu} 
                	showHideFilterMenu={this.showHideFilterMenu}
                	tagType={ this.state.tagType } />
            </div>
        );
    }

});

var FilterMenu = ReactRedux.connect(function(state, ownProps) {
	return {
		searchTerms: state.appState.searchTerms,
		filters: state.appState.tags[ownProps.tagType.value]
	}
}, function(dispatch) {
	return {
		updateSearch: function(searchTerm, active, terms) {
			var newState;

			if (active) {
				newState = terms.concat({
					text: searchTerm.name,
					type: SearchTermType.Tag,
					data: searchTerm
				});
			} else {
				newState = terms.filter((item) => {
					return item.text !== searchTerm.text && item.type === searchTerm.type;
				});
			}

			dispatch(beginSearch(newState));
		},

		refreshTags: function(tagTypeId) {
			dispatch(refreshTags(tagTypeId));
		}
	}
})(React.createClass({
	getInitialState() {
		return {
			tagName: ''
		}
	},
	getDefaultProps() {
		return {
			filters: []
		}
	},
	componentDidMount() {
		this.updateTagType(this.props.tagType);

		TagSystemTypeEnum.enums.forEach((item) => {
			if (item.value > 0) {
				this.props.refreshTags(item.value);
			}
		});
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.tagType !== this.props.tagType) {
			this.updateTagType(nextProps.tagType)
		}
	},
	updateTagType(tagType) {

		if (tagType !== TagSystemTypeEnum.None) {
			this.setState({
				tagName: tagType.key
			})
		}
	},
    showHideFilterMenu: function() {
        this.props.showHideFilterMenu();
    },
    onFilterChange: function(filter, active) {
    	this.props.updateSearch(filter, active, this.props.searchTerms);
    },
    render: function() {
        return (
            <div>
                <div 
                	onClick={this.showHideFilterMenu} 
                	id="f-overlay"
                	className={(this.props.displayFilterMenu ? 'filter-page-overlay active' : 'filter-page-overlay')}></div>
                <div className="filter-menu">
                    <div className={ this.props.displayFilterMenu ? 'visible ' : ''}>
                    	<div className="filter-menu-content">
                        <div className="filter-menu-header">
                            Select { this.state.tagName } 
                        </div>

                        { this.props.filters.map((item, index) => {
                        	return (
                        		<FilterItem key={ index } item={ item } onFilterChange={ this.onFilterChange } />
                        	)
                        })}
                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}))

var FilterItem = React.createClass({
	getInitialState() {
		return {
			active: false,
			filterId: null
		}
	},
    toggleFilter: function(filter) {
    	var newState = !this.state.active;

        this.setState({
        	active: newState
        })

        this.props.onFilterChange(filter, newState)
    },

    render: function() {
        return (
            <div 
            	className={this.state.active ? 'filter-item active' : 'filter-item'} 
            	onClick={this.toggleFilter.bind(this, this.props.item)}>{ this.props.item.name }
            </div>
        );
    }
});