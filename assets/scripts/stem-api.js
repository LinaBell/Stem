var StemApi = (function () {
    function StemApi(url) {
        this.baseUrl = url;
        this.authorization = null;
    }

    ///////////// Authentication /////////////
    //
    StemApi.prototype.setAuth = function (token_type, access_token) {
        var _this = this;
        _this.authorization = token_type + ' ' + access_token;
    };

    StemApi.prototype.register = function (rse) {
        var _this = this;
        $.ajax({
            type: 'POST',
            url: _this.baseUrl + 'authentication/register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(rse.request),
            dataType: 'json',
            success: function (response) {
                rse.success(response);
            },
            error: function (response) {
                rse.error(response);
            }
        });
    };

    StemApi.prototype.login = function (rse) {
        var _this = this;
        $.ajax({
            type: 'POST',
            url: _this.baseUrl + 'authentication/login',
            data: rse.request.form.serialize(),
            success: function (response) {
                rse.success(response);
            },
            error: function (response) {
                rse.error(response);
            }
        });
    };

    ///////////// Account /////////////
    //
    StemApi.prototype.createAccount = function (rse) {
        var _this = this;
        $.ajax({
            type: 'POST',
            url: _this.baseUrl + 'account',
            headers: { 'Authorization': _this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(rse.request),
            dataType: 'json',
            error: function (response) {
                rse.error(response);
            },
            success: function (response) {
                rse.success(response);
            }
        });
    };

    StemApi.prototype.updateAccount = function (rse) {
        var _this = this;
        $.ajax({
            type: 'PUT',
            url: _this.baseUrl + 'account',
            headers: { 'Authorization': _this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(rse.request),
            dataType: 'json',
            error: function (response) {
                rse.error(response);
            },
            success: function (response) {
                rse.success(response);
            }
        });
    };

    StemApi.prototype.getAccount = function (rse) {
        var _this = this;
        $.ajax({
            type: 'GET',
            url: _this.baseUrl + 'account',
            headers: { 'Authorization': _this.authorization },
            contentType: 'application/json; charset=utf-8',
            error: function (response) {
                rse.error(response);
            },
            success: function (response) {
                rse.success(response);
            }
        });
    };

    ///////////// Files /////////////
    //
    StemApi.prototype.cancelUpload = Promise.method(function(req) {
    	return $.ajax({
	        type: 'PUT',
	        url: this.baseUrl + 'files/upload/' + req.id,
	        headers: { 'Authorization': this.authorization },
	        contentType: 'application/json; charset=utf-8',
	        data: JSON.stringify({ isCanceled: true }),
	        dataType: 'json'
	    });
    });

    StemApi.prototype.upload = Promise.method(function (req) {
    	var uploadResponse;    	

        return Promise.resolve($.ajax({
            type: 'POST',
            url: this.baseUrl + 'files/upload',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ fileName: req.file.name }),
            dataType: 'json'
        }))
        .then((res) => {
        	uploadResponse = res;

            return $.ajax({
                type: uploadResponse.verb,
                url: uploadResponse.url,
                contentType: uploadResponse.contentType,
                headers: uploadResponse.headers,
                // this flag is important, if not set, it will try to send data as a form
                processData: false,
                // the actual file is sent raw
                data: req.file
            });
        })
        .then((res) => {
        	return $.ajax({
	            type: 'PUT',
	            url: this.baseUrl + 'files/upload/' + uploadResponse.id,
	            headers: { 'Authorization': this.authorization },
	            contentType: 'application/json; charset=utf-8',
	            data: JSON.stringify({ isComplete: true }),
	            dataType: 'json'
	        });
        })
        .catch((reason) => {
        	console.error('Error during upload api call: ' + reason);

        	if (uploadResponse.id) {
        		console.log('Attempting to cancel the upload...');
        		return this.cancelUpload({
		 			id: uploadResponse.id
        		});
        	}
        });
    })

    ///////////// Songs /////////////
    //
    StemApi.prototype.createSong = Promise.method(function (req) {
        return $.ajax({
            type: 'POST',
            url: this.baseUrl + 'songs',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(req),
            dataType: 'json'
        });
    });

    StemApi.prototype.updateSong = function (rse) {
        var _this = this;
        $.ajax({
            type: 'PUT',
            url: _this.baseUrl + 'songs/' + rse.request.id,
            headers: { 'Authorization': _this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(rse.request),
            dataType: 'json',
            error: function (response) {
                rse.error(response);
            },
            success: function (response) {
                rse.success(response);
            }
        });
    };

    StemApi.prototype.getSong = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'songs/' + req.id,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.getSongsByArtist = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'artists/' + req.artistId + '/songs',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.getSongsByAlbum = Promise.method(function (req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'albums/' + req.id + '/songs',
    		headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
    	});
    });

    StemApi.prototype.getSongsByAlbumAdmin = Promise.method(function(req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'admin/albums/' + req.id + '/songs',
    		headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
    	});
    });

    StemApi.prototype.searchSongs = Promise.method(function (req) {
        return $.ajax({
            type: 'POST',
            url: this.baseUrl + 'songs/search',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(req),
            dataType: 'json'
        });
    })

    ///////////// Albums /////////////
    //
    StemApi.prototype.createAlbum = Promise.method(function (req) {
        return $.ajax({
            type: 'POST',
            url: this.baseUrl + 'albums',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(req),
            dataType: 'json'
        });
    });

    StemApi.prototype.getAlbum = Promise.method(function (req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'albums/' + req.id,
    		headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
    	});
    });

    StemApi.prototype.getAlbumsByArtist = function (rse) {
        var _this = this;
        $.ajax({
            type: 'GET',
            url: _this.baseUrl + 'artists/' + rse.request.artistId + '/albums',
            headers: { 'Authorization': _this.authorization },
            contentType: 'application/json; charset=utf-8',
            error: function (response) {
                rse.error(response);
            },
            success: function (response) {
                rse.success(response);
            }
        });
    };

    ///////////// Tags /////////////
    //
    StemApi.prototype.getAllTagTypes = Promise.method(function(req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'tagtypes',
    		data: req,
    		headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
    	});
    });

    StemApi.prototype.getTagValues = Promise.method(function(req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'tagtypes/' + req.tagTypeId + '/tags',
    		headers: { Authorization: this.authorization },
    		contentType: 'application/json; charset=utf-8'
    	});
    });

    StemApi.prototype.getTagType = Promise.method(function(req) {
   		return $.ajax({
   			type: 'GET',
   			url: this.baseUrl + 'tagtypes/' + req.id,
   			headers: { Authorization: this.authorization },
   			contentType: 'application/json; charset=utf-8'
   		});
    })

    ///////////// Creators /////////////
    //
    StemApi.prototype.getCreatorDownloads = Promise.method(function (req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'creators/' + req.creatorId + '/downloads',
    		headers: { 'Authorization': this.authorization },
    		contentType: 'application/json; charset=utf-8',
    	});
    });

    StemApi.prototype.getCreatorProfile = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'creators/' + req.creatorId,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    }); 

    StemApi.prototype.getCreatorBookmarks = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'creators/' + req.creatorId + '/bookmarkedsongs',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.bookmarkSong = Promise.method(function (req) {
        return $.ajax({
            type: 'POST',
            url: this.baseUrl + 'songs/' + req.song + '/bookmark',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.unBookmarkSong = Promise.method(function (req) {
        return $.ajax({
            type: 'DELETE',
            url: this.baseUrl + 'songs/' + req.song + '/bookmark',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.getSpinHistory = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'creators/' + req.id + '/spins',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });
    
    ///////////// Artists /////////////
    //
    StemApi.prototype.getArtistsPopular = function (rse) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'artists/popular',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
        });
    }
    
    StemApi.prototype.getArtistDashboard = function (rse) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'artists/' + rse.artistId + '/dashboard',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
        });
    }

    StemApi.prototype.getArtist = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'artist/' + req.id,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

	///////////// Admin /////////////
	//
    StemApi.prototype.getArtistSignups = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'admin/artists/signups/' + req.days,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.getArtistSubmissions = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'admin/artists/submissions/' + req.days,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.getCreatorSignups = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'admin/creators/signups/' + req.days,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });

    StemApi.prototype.updateSongAdmin = Promise.method(function (req) {
    	return $.ajax({
    		type: 'PUT',
    		url: this.baseUrl + 'admin/songs/' + req.id,
    		headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(req),
            dataType: 'json'
    	});
    });

    return StemApi;
}());