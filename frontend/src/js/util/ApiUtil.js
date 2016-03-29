/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //constants
    var urlConstants = require('../constants/urlConstant');

    var url = window.location.origin + urlConstants.RESOURCE_SERVER + '/';
    var authUrl = window.location.origin + urlConstants.AUTH_SERVER + '/';
    var coreUrl = window.location.origin + urlConstants.CORE_SERVER + '/';

    //libraries
    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var ApiUtil = {
        fetchById: function (resourceName, id) {
            return request
                .get(url + resourceName.toLowerCase() + "/" + id)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchByQuery: function (resourceName, data, callback, searchMode) {
            request
                .get(url + resourceName.toLowerCase() + '?title=' + data + '&searchMode=' + searchMode)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body.data);
                }, function (error) {
                    if(error.status = 401) {
                        ApiUtil.refreshSession().then(function(response) {
                           ApiUtil.fetchByQuery(resourceName, data, callback, searchMode);
                        });
                    }
                })
        },

        fetchByQuery2: function (resourceName, data) {
            return request
                .get(url + resourceName.toLowerCase() + '?start=' + data._start + '&offset=' + data._limit)
                .set('Authorization', 'Bearer'+ ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
        },

        fetchAll: function (resourceName) {
            return request
                .get(url + resourceName.toLowerCase())
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchAllFromCore: function (resourceName, callback) {
            request
                .get(coreUrl + resourceName.toLowerCase())
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                }, function (error) {
                    if(error.status = 401) {
                        ApiUtil.refreshSession().then(function(response) {
                            ApiUtil.fetchAllFromCore(resourceName, callback);
                        });
                    }
                });
        },

        create: function (resourceName, data) {
            return request
                .post(url + resourceName.toLowerCase())
                .send(data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        edit: function (resourceName, data, dataId) {
            return request
                .put(url + resourceName.toLowerCase() + '/' + dataId)
                .send(data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        delete: function (resourceName, dataId) {
            return request
                .del(url + resourceName.toLowerCase() + '/' + dataId)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
        },

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
    };

    module.exports = ApiUtil;

})();
