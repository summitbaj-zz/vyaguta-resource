/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    var config = require('../../../config/config');
    var urlConstants = require('../constants/urlConstant');
    //var actionTypeConstant = require('../constants/actionTypeConstant');
    var errorActions = require('../actions/errorActions');
    //var url =  window.location.origin + urlConstants.RESOURCE_SERVER + '/';
    var url = "http://localhost:3000/";
    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var ApiUtil = {
        fetchById: function (resourceName, id, callback) {
            request
                .get(url + resourceName.toLowerCase() + "/" + id)
                /* */
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                },function(error){
                    errorActions.getError(error);
                });
        },

        fetchAll: function (resourceName, callback) {
            request
                .get(url + resourceName.toLowerCase())
                .set('Accept', 'application/json')
                .then(function (res) {
                    callback(res.body);
                },function(error){
                    errorActions.getError(error)
                });
        },

        create: function (resourceName, data, callback) {
            request
                .post(url + resourceName.toLowerCase())
                .send(data)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                },function(error){
                    errorActions.getError(error);
                });
        },

        edit: function (resourceName, data, dataId, callback) {
            request
                .put(url + resourceName.toLowerCase() + '/' + dataId)
                .send(data)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .set('Accept', 'application/json')
                .then(function (response) {
                    callback(response.body);
                },function(error){
                    errorActions.getError(error);
                });
        },

        delete: function (resourceName, dataId, callback) {
            request
                .delete(url + resourceName.toLowerCase() + '/' + dataId)
                .then(function (response) {
                    callback(response.body);
                },function(error){
                    errorActions.getError(error);
                });
        }
    };

    module.exports = ApiUtil;

})();
