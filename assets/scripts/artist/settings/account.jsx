var ArtistAccountSettings = ReactRedux.connect(function(state) {
    return {
        userInfo: state.userState.userInfo
    };
})(React.createClass({
    getInitialState: function () {
        return {
            characterCount: 0,
            disableButton: false,
            saveSuccessful: false,
            profileImgURL: this.props.userInfo.profileImageUrl,
            bannerImgURL: this.props.userInfo.bannerImageUrl,
            profileName: this.props.userInfo.profileName,
            customLink: this.props.userInfo.customLink,
            email: this.props.userInfo.email,
            country: this.props.userInfo.country,
            timeZone: this.props.userInfo.timeZone,
            bio: this.props.userInfo.bio,
            errorMessage: '',

            profileImgId: 0,
            bannerImgId: 0,
            fileCount: 0,
            updateCount: 0
        }
    },

    handleFieldChange: function (e) {
        var id = e.target.id;
        this.setState({
			[id]: e.target.value,
            saveSuccessful: false
        });
    },

    handleLineGrow: function (e) {
        var id = e.target.id;
        this.setState({
			[id]: e.target.value,
            saveSuccessful: false
        });

        if (e.target.value.length == 0) {
            this.setState({ characterCount: 0 });
        }
        if (e.target.value.length > this.state.characterCount) {
            this.setState({ characterCount: e.target.value.length });
            this.setState({ disableButton: false });

            if (this.state.characterCount >= 300) {
                this.setState({ characterCount: e.target.value.length });
                this.setState({ disableButton: true });
                alert("You can only have up to 300 characters! You are " + (e.target.value.length - 300) + " characters over");
            }
            if (this.state.characterCount <= 300) {
                this.setState({ disableButton: false });
            }

        } else {
            this.setState({ characterCount: this.state.characterCount - (this.state.characterCount - e.target.value.length) });
            if (e.target.value.length == 0) {
                this.setState({ characterCount: 0 });
            }
        }
    },

    handleFileUpload: function (e) {
        console.log(JSON.stringify(e.target.value));
        e.preventDefault();

        var id = e.target.id,
    		reader = new FileReader(),
			file = e.target.files[0];

        reader.onloadend = () => {
            if ([id] == 'profileImg') {
                this.setState({
                    profileImg: file,
                    profileImgURL: reader.result
                });
            } else {
                this.setState({
                    bannerImg: file,
                    bannerImgURL: reader.result
                });
            }
        }
        reader.readAsDataURL(file)
        this.setState({
            saveSuccessful: false
        });
        //this.saveFile(file);
    },

    handleSave: function () {
        var self = this

        // Reset state
        var fileCount = 0;
        if (this.state.profileImg) {
            fileCount++;
        }
        if (this.state.bannerImg) {
            fileCount++;
        }
        self.setState({
            fileCount: fileCount,
            updateCount: 0
        });

        // Upload profile image if needed
        if (this.state.profileImg) {
            stemApi.upload({
                file: this.state.profileImg
            }).then(function (response) {
	            self.setState({
	                profileImg: null,
	                profileImgId: response.id
	            });

	            self.updateAccount();
	        }, function (error) {
            	console.error(JSON.stringify(error, null, 2));
            });
        };

        // Upload banner image if needed
        if (this.state.bannerImg) {
            stemApi.upload({
            	file: this.state.bannerImg
            }).then(function (response) {
	            self.setState({
	                bannerImg: null,
	                bannerImgId: response.id
	            });
	            self.updateAccount();
	        }, function (error) {
	            console.error(JSON.stringify(error, null, 2));
            });
        };

        // If no files, then we need to trigger the update.
        if (fileCount == 0) {
            this.updateAccount();
        }
    },

    updateAccount: function () {
        var self = this;

        // Exit if someone else will save.
        if (this.state.fileCount > 0) {
            this.setState({ updateCount: this.state.updateCount + 1 });
            if (this.state.updateCount < this.state.fileCount) {
                return;
            }
        }

        // Build request
        var request = {
            "general": {
                "profileName": this.state.profileName,
                "customLink": this.state.customLink,
                "email": this.state.email,
                "bio": this.state.bio
            }
        };
        if (this.state.profileImgId) {
            request.profileImageFileId = this.state.profileImgId;
        }
        if (this.state.bannerImgId) {
            request.bannerImageFileId = this.state.bannerImgId;
        }

        // Update account
        stemApi.updateAccount({
            request: request,
            success: function (response) {
                self.setState({
                    saveSuccessful: true,
                    bannerImgId: null,
                    profileImgId: null,
                    bannerImgURL: response.bannerImageUrl,
                    profileImgUrl: response.profileImageUrl
                });
                store.dispatch({
                    type: 'UpdateUserRecord',
                    data: { userInfo: response }
                });
            },
            error: function (response) {
                console.error(JSON.stringify(response, null, 2));
            }
        });
    },

    render: function () {
        var self = this;

        return (
            <div className="artist-account-settings pad-box-lg">
				<div className="col-xs-12 mar-b-md">
					<h2 className="mar-b-sm">Account</h2>
					<h5>Update your account settings</h5>
				</div>
				<div className="col-xs-12 col-lg-3 pad-box-md">
					<div className="upload circle text-center">
					    {this.state.profileImgURL ?
							<div className="upload-label update">
								<h5>UPDATE PROFILE IMAGE</h5>
								<p>Suggested Size 1000x1000</p>
							</div>
						:
							<div className="upload-label">
								<h5>UPLOAD PROFILE IMAGE</h5>
								<p>Suggested Size 1000x1000</p>
							</div>
					    }
						<img id="profile-img-upload" src={this.state.profileImgURL} />
						<input onChange={this.handleFileUpload} type="file" name="profileImg" id="profileImg" />
					</div>
				</div>
				<div className="col-xs-12 col-lg-9 pad-box-md">
					<div className="upload text-center">
					    {this.state.bannerImgURL ?
							<div className="upload-label update">
								<h5>UPDATE BANNER IMAGE</h5>
								<p>Suggested Size 1000x1000</p>
							</div>
						:
							<div className="upload-label">
								<h5>UPLOAD BANNER IMAGE</h5>
								<p>Suggested Size 1000x1000</p>
							</div>
					    }
						<img src={this.state.bannerImgURL} />
						<input onChange={this.handleFileUpload} type="file" name="bannerImg" id="bannerImg" />
					</div>
				</div>
				<div className="col-xs-12 col-md-6 col-lg-5 pad-t-md">
					<h4 className="mar-b-sm">Profile Name</h4>
					<input id="profileName" onChange={this.handleFieldChange} value={this.state.profileName} />
					<h4 className="mar-b-sm">Custom Link</h4>
					<input id="customLink" onChange={this.handleFieldChange} value={this.state.customLink} />
					<p>http://stem.com/myprofile</p>
					<h4 className="mar-b-sm">Email</h4>
					<input id="email" type="email" onChange={this.handleFieldChange} value={this.state.email} />
				</div>

				<div className="col-xs-12 col-md-6 pad-t-md pad-b-sm">
					<h4 className="mar-b-sm">Biography</h4>
					<textarea id="bio" className="form-input" onChange={self.handleLineGrow} value={this.state.bio} />
					<div className="character-count">
						<p className="display-inlb mar-r-md">{this.state.characterCount}/300 Characters</p>
							<svg height="20" width="400" className="display-inlb">
								<line className="svg-line2" x1="300" y='0' />
								<line className="svg-line" x1={self.state.characterCount} y='0' />
							</svg>
					</div>
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