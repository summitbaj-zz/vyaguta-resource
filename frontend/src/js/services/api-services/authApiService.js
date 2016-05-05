;(function () {
    'use strict';

    //utils
    var apiUtil = require('../../utils/apiUtil');

    //constants
    var urlConstants = require('../../constants/urlConstants');

    //libraries
    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var authUrl = window.location.origin + urlConstants.AUTH_SERVER + '/';

    var authApiService = {
        refreshSession: function () {
            return request
                .post(authUrl)
                .send({'refresh_token': localStorage.getItem('refresh_token')})
                .set('Accept', 'application/json')
                .then(function (response) {
                    localStorage.access_token = response.body.access_token;
                    localStorage.refresh_token = response.body.refresh_token;
                }, function (error) {
                    window.location.href = window.location.origin;
                });
        }
    }

    module.exports = authApiService;

})();