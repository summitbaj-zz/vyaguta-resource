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

    var apiUtil = {
        fetchById: function (resourceName, id) {
            return request
                .get(url + resourceName.toLowerCase() + "/" + id)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchByQuery: function (resourceName, data, callback) {
            request
                .get(url + resourceName.toLowerCase() + '?q=' + data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body.data);
                }, function (error) {
                    if (error.status = 401) {
                        apiUtil.refreshSession().then(function (response) {
                            apiUtil.fetchByQuery(resourceName, data, callback);
                        });
                    } else {
                        callback([]);
                    }

                })
        },

        fetchByTitle: function (resourceName, data, callback) {
            request
                .get(url + resourceName.toLowerCase() + '?title=' + data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body.data);
                }, function (error) {
                    if (error.status = 401) {
                        apiUtil.refreshSession().then(function (response) {
                            apiUtil.fetchByQuery(resourceName, data, callback);
                        });
                    } else {
                        callback([]);
                    }

                })
        },

        fetchByQuery2: function (resourceName, data, sortBy) {
            var sort = '';

            if (sortBy) {
                sort = 'sort=' + sortBy + '&';
            }
            return request
                .get(url + resourceName.toLowerCase() + '?' + sort + 'start=' + data._start + '&offset=' + data._limit)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
        },

        fetchAll: function (resourceName) {
            return request
                .get(url + resourceName.toLowerCase())
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchAllFromCore: function (resourceName) {
            return request
                .get(coreUrl + resourceName.toLowerCase())
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchByQueryFromCore: function (resourceName, data) {
            return request
                .get(coreUrl + resourceName.toLowerCase() + '?q=' + data)
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')

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

        fetchAllHistories: function(resourceName, id){
            return request
                .get(url + resourceName.toLowerCase() + '/' + id + '/history')
                .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
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

        },

        logOut: function(){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = window.location.origin;
        }
    };

    module.exports = apiUtil;

})();
