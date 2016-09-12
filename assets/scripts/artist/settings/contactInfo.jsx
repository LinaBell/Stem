var ArtistContactInfo = ReactRedux.connect(function(state) {
	return {
		primaryContactInfo: state.userState.userInfo.primaryContact
	};
})(React.createClass({
	getInitialState: function() {
		return {
			saveSuccessful: false,
			firstName: this.props.primaryContactInfo.firstName,
			lastName: this.props.primaryContactInfo.lastName,
			email: this.props.primaryContactInfo.email,
			phone: this.props.primaryContactInfo.phone,
			address: this.props.primaryContactInfo.address,
			city: this.props.primaryContactInfo.city,
			state: this.props.primaryContactInfo.state,
			zip: this.props.primaryContactInfo.zip,
			errorMessage: ''
		}
	},

    handleFieldChange: function(e) {
    	var id = e.target.id;
        this.setState({
			[id]: e.target.value,
			saveSuccessful: false
		});
    },

	handleSave: function() {
		var self = this;
		
        stemApi.updateAccount({
            request: {
				"primaryContact": {
					"firstName": this.state.firstName,
					"lastName": this.state.lastName,
					"email": this.state.email,
					"phone": this.state.phone,
					"address": this.state.address,
					"city": this.state.city,
					"state": this.state.state,
					"zip": this.state.zip,
				}
            },
			success: function(response) {
				console.log('success!');
				console.log(JSON.stringify(response, null, 2));
				self.setState({saveSuccessful: true});
				store.dispatch({
					type: 'UpdateUserRecord',
					data: { userInfo: response }
				});
			},
            error: function (response) {
				console.error(JSON.stringify(response, null, 2));
	            self.setErrorMessage(errorMessage);	
            }
        });
	},

	render: function() {
		return(
            <div className="content-with-sidebar"> 
				<div className="col-xs-12 divider"></div>
				<div className="col-xs-12 pad-b-lg">
					<h3>Contact Information</h3>
					<h5>We may contact you occasionally for opportunities</h5>
				</div>
				<div className="col-xs-12 col-sm-12 col-md-2 pad-b-md">
					<h4>Primary Contact</h4>
				</div>
				<div className="col-xs-12 col-sm-8 col-md-5 pad-b-sm">
					<input id="firstName" placeholder="First Name" onChange={this.handleFieldChange} value={this.state.firstName} /> 
					<input id="phone" placeholder="Mobile Number" onChange={this.handleFieldChange} value={this.state.phone} /> 
					<input id="address" placeholder="Street Address" onChange={this.handleFieldChange} value={this.state.address} /> 
					<select id="state" className="btn btn-wide" onChange={this.handleFieldChange} value={this.state.state}> 
						<option value="AL">AL</option>
						<option value="AK">AK</option>
						<option value="AZ">AZ</option>
						<option value="AR">AR</option>
						<option value="CA">CA</option>
						<option value="CO">CO</option>
						<option value="CT">CT</option>
						<option value="DE">DE</option>
						<option value="FL">FL</option>
						<option value="GA">GA</option>
						<option value="HI">HI</option>
						<option value="ID">ID</option>
						<option value="IL">IL</option>
						<option value="IN">IN</option>
						<option value="IA">IA</option>
						<option value="KS">KS</option>
						<option value="KY">KY</option>
						<option value="LA">LA</option>
						<option value="ME">ME</option>
						<option value="MD">MD</option>
						<option value="MA">MA</option>
						<option value="MI">MI</option>
						<option value="MN">MN</option>
						<option value="MS">MS</option>
						<option value="MO">MO</option>
						<option value="MT">MT</option>
						<option value="NE">NE</option>
						<option value="NV">NV</option>
						<option value="NH">NH</option>
						<option value="NJ">NJ</option>
						<option value="NM">NM</option>
						<option value="NY">NY</option>
						<option value="NC">NC</option>
						<option value="ND">ND</option>
						<option value="OH">OH</option>
						<option value="OK">OK</option>
						<option value="OR">OR</option>
						<option value="PA">PA</option>
						<option value="RI">RI</option>
						<option value="SC">SC</option>
						<option value="SD">SD</option>
						<option value="TN">TN</option>
						<option value="TX">TX</option>
						<option value="UT">UT</option>
						<option value="VT">VT</option>
						<option value="VA">VA</option>
						<option value="WA">WA</option>
						<option value="WV">WV</option>
						<option value="WI">WI</option>
						<option value="WY">WY</option>
					</select>
				</div>
				<div className="col-xs-12 col-sm-8 col-md-5">
					<input id="lastName" placeholder="Last Name" onChange={this.handleFieldChange} value={this.state.lastName} /> 
					<input id="email" placeholder="Alternate Email Address" onChange={this.handleFieldChange} value={this.state.email} /> 
					<input id="city" placeholder="City" onChange={this.handleFieldChange} value={this.state.city} /> 
					<input id="zip" placeholder="Zip" onChange={this.handleFieldChange} value={this.state.zip} /> 
				</div> 

				{ this.state.errorMessage != '' ?
					<span className="error">{this.state.errorMessage}</span>
				: null }

				<div className="col-xs-12"> 
					<div className="pull-right">
						{ this.state.saveSuccessful ?
							<button type="button" onClick={this.handleSave} className="btn btn-sm btn-primary-lt">
								<span className="icon-ok-circled2"> </span> Save
							</button>
						:
							<button type="button" onClick={this.handleSave} className="btn btn-sm btn-primary" disabled={this.state.disableButton}>
								<span className="icon-ok-circled"> </span> Save
							</button>
						}
					</div>
				</div>
			</div>
		)
	}
}));