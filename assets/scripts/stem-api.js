var StemApi = (function () {
    function StemApi(url) {
        this.baseUrl = url;
        this.authorization = null;
    }

    // Login
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

    // Account
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

    // File
    StemApi.prototype.upload = Promise.method(function (req) {
    	var uploadResponse = null;

        return $.ajax({
            type: 'POST',
            url: this.baseUrl + 'files/upload',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ fileName: req.file.name }),
            dataType: 'json'
        })
        .then(function(res) {
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
        }.bind(this))
        .then(function(res) {
        	return $.ajax({
	            type: 'PUT',
	            url: this.baseUrl + 'files/upload/' + uploadResponse.id,
	            headers: { 'Authorization': this.authorization },
	            contentType: 'application/json; charset=utf-8',
	            data: JSON.stringify({ isComplete: true }),
	            dataType: 'json'
	        });
        }.bind(this));
    });

    //Song
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

    // Promisified this method
    StemApi.prototype.searchSongs = function (rse) {
        return $.ajax({
            type: 'POST',
            url: this.baseUrl + 'songs/search',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(rse.request),
            dataType: 'json'
        });
    };

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

    StemApi.prototype.getCreatorDownloads = Promise.method(function (req) {
    	return $.ajax({
    		type: 'GET',
    		url: this.baseUrl + 'creators/' + req.creatorId + '/downloads',
    		headers: { 'Authorization': this.authorization },
    		contentType: 'application/json; charset=utf-8',
    	});
    });
    
    StemApi.prototype.getArtistsPopular = function (rse) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'artists/popular',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
        });
    }
    StemApi.prototype.getCreatorProfile = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'creators/' + req.creatorId,
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    }); 
    StemApi.prototype.getArtistDashboard = function (rse) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'artists/' + rse.artistId + '/dashboard',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8',
        });
    }
    StemApi.prototype.getCreatorBookmarks = Promise.method(function (req) {
        return $.ajax({
            type: 'GET',
            url: this.baseUrl + 'creators/' + req.creatorId + '/bookmarkedsongs',
            headers: { 'Authorization': this.authorization },
            contentType: 'application/json; charset=utf-8'
        });
    });
    return StemApi;
}());