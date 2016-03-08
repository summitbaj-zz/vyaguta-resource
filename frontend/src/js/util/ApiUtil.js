/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    var config = require('../../../config/config');
    var urlConstants = require('../constants/urlConstant');

    var errorActions = require('../actions/errorActions');

    //var url =  window.location.origin + urlConstants.RESOURCE_SERVER + '/';
    //var coreUrl = window.location.origin + urlConstants.CORE_SERVER + '/';

    var url = "http://localhost:3000/";
    var coreUrl = "http://localhost:3000/";

    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var ApiUtil = {
        fetchById: function (resourceName, id) {
            return request
                .get(url + resourceName.toLowerCase() + "/" + id)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json');
        },

        fetchByQuery: function (resourceName, data, callback) {
            request
                .get(url + resourceName.toLowerCase() + '/title/' + data)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                }, function (error) {
                    errorActions.getError(error);
                })
        },

        fetchAll: function (resourceName) {
            return request
                .get(url + resourceName.toLowerCase())
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('API-Key', 'foobar')
                .set('Accept', 'application/json');
        },

        fetchAllFromCore: function (resourceName, callback) {
            request
                .get(coreUrl + resourceName.toLowerCase())
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('API-Key', 'foobar')
                .set('Accept', 'application/json')
                .then(function (response) {
                    ajaxLoader.hide();
                    callback(response.body);
                }, function (error) {
                    errorActions.getError(error);
                })
        },

        create: function (resourceName, data, callback) {
            return  request
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
