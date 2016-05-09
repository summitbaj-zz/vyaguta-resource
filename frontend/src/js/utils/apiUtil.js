/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //constants
    var urlConstants = require('../constants/urlConstants');

    //libraries
    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var apiUtil = {
        fetch: function (url, pathParam, queryParams) {
            return request
                .get(url + pathParam + queryParams)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        create: function (url, pathParam, data) {
            return request
                .post(url + pathParam)
                .send(data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        edit: function (url, pathParam, data) {
            return request
                .put(url + pathParam)
                .send(data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        delete: function (url, pathParam) {
            return request
                .del(url + pathParam)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
        }
    };

    module.exports = apiUtil;

})();
