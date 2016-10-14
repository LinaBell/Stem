var TagSelector = React.createClass({
	componentDidMount: function() {
		$(this.refs.selectElement).selectize({
			plugins: ['remove_button'],
			create: false,
			valueField: 'id',
        	labelField: 'name',
        	searchField: 'name',
        	onChange: this.onChange,
        	options: this.props.tagList ? this.props.tagList : undefined
		});

		if (this.props.values) {
			this.populateSelectedItems(this.props.values);
		}
	},

	populateSelectedItems: function(values) {
		var selectize = $(this.refs.selectElement).data('selectize');
		selectize.clear(true);

		if (values) {
			values.forEach(function(item) {
				selectize.addItem(item.id.toString(), true);
			});
		}
	},
	
	componentWillReceiveProps: function(nextProps) {

		// Populate options when the tag list is first populated if the initial set of items is not available
		// when the component is mounted, otherwsise we do this set in componentDidMount
		if (nextProps.tagList.length > 0 && (!this.props.tagList || this.props.tagList.length === 0)) {
			$(this.refs.selectElement)
				.data('selectize')
				.addOption(nextProps.tagList);
		}

		// Clear selected items when the values are cleared
		if (!nextProps.values && this.props.values) {
			$(this.refs.selectElement)
				.data('selectize')
				.clear(false);
		}

		if (nextProps.values !== this.props.values) {
			this.populateSelectedItems(nextProps.values);
		}
	},
	onChange: function(selections) {
		if (this.props.onSelectionsChange) {

			var selectedTags = null;

			if (selections) {
				selectedTags = this.props.tagList.filter(function(item) {
					return selections.includes(item.id.toString());
				});
			}

			this.props.onSelectionsChange(selectedTags);
		}
	},
	render: function() {
		var tagName = this.props.tag ? this.props.tag.name : null;

		return (
			<div>
				<p>{ tagName }</p>
				
				<select ref="selectElement" multiple>
				</select>

			</div>
		);
	}
});