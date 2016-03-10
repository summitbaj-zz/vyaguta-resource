/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //environment configuration
    var config = require('../../../config/config');

    //constants
    var urlConstants = require('../constants/urlConstant');
    var url = config.resourceServer;
    var coreUrl = config.coreServer;

    //libraries
    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var ApiUtil = {
        fetchById: function (resourceName, id) {
            return request
                .get(url + resourceName.toLowerCase() + "/" + id)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchByQuery: function (resourceName, data, callback, searchMode) {
            request
                .get(url + resourceName.toLowerCase() + '?title=' + data+'&searchMode='+ searchMode)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                }, function (error) {
                    //handle error
                })
        },

        fetchAll: function (resourceName) {
            return request
                .get(url + resourceName.toLowerCase())
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchAllFromCore: function (resourceName, callback) {
            request
                .get(coreUrl + resourceName.toLowerCase())
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                }, function (error) {
                    //handle error
                })
        },

        create: function (resourceName, data, callback) {
            return request
                .post(url + resourceName.toLowerCase())
                .send(data)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        edit: function (resourceName, data, dataId) {
            return request
                .put(url + resourceName.toLowerCase() + '/' + dataId)
                .send(data)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        delete: function (resourceName, dataId) {
            return request
                .del(url + resourceName.toLowerCase() + '/' + dataId)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
        }
    };

    module.exports = ApiUtil;

})();
