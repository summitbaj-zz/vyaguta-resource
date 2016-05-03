/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //constants
    var urlConstants = require('../constants/urlConstants');

    var url2 = window.location.origin + urlConstants.RESOURCE_SERVER + '/';
    var authUrl2 = window.location.origin + urlConstants.AUTH_SERVER + '/';
    var coreUrl2 = window.location.origin + urlConstants.CORE_SERVER + '/';

    //libraries
    var Promise = require('promise');
    var request = require('superagent-promise')(require('superagent'), Promise);

    var apiUtil = {
        /*fetch: function (url, resourceName, type) {
         return request
         .get(url + resourceName.toLowerCase() + "/" + type)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json');
         },

         fetchByQuery: function (url, resourceName, queryParams) {
         return request
         .get(url + resourceName.toLowerCase() + queryParams)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },*/

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
        },


        /*fetchById: function (pathParam, id) {
         return request
         .get(url + pathParam.toLowerCase() + "/" + id)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json');
         },

         fetchByType: function (resourceName, type) {
         return request
         .get(url + resourceName.toLowerCase() + "/" + type)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json');
         },

         fetchByQuery2: function (resourceName, data, callback) {
         return request
         .get(url + resourceName.toLowerCase() + '?q=' + data)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         fetchByTitle: function (resourceName, data, callback) {
         return request
         .get(url + resourceName.toLowerCase() + '?title=' + data)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         fetchBySortingQuery: function (resourceName, data, sortBy) {
         var sort = '';

         if (sortBy) {
         sort = 'sort=' + sortBy + '&';
         }
         return request
         .get(url + resourceName.toLowerCase() + '?' + sort + 'start=' + data._start + '&offset=' + data._limit)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         fetchAll2: function (resourceName) {
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

         fetchByField: function (resourceName, field, data) {
         return request
         .get(url + resourceName.toLowerCase() + '?' + field + '=' + data)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         fetchByEndDate: function (resourceName, projectType, data) {
         return request
         .get(url + resourceName.toLowerCase() + '/' + projectType.toLowerCase() + '?contract.endDate=' + data)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         fetchResourceCount: function (resourceName, type) {
         return request
         .get(url + 'projects/' + resourceName.toLowerCase() + '/' + type.toLowerCase())
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         create2: function (resourceName, data) {
         return request
         .post(url + resourceName.toLowerCase())
         .send(data)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json');
         },

         edit2: function (resourceName, data, dataId) {
         return request
         .put(url + resourceName.toLowerCase() + '/' + dataId)
         .send(data)
         .set('Authorization', 'Bearer' + ' ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json');
         },

         delete2: function (resourceName, dataId) {
         return request
         .del(url + resourceName.toLowerCase() + '/' + dataId)
         .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
         .set('Accept', 'application/json')
         },

         fetchAllHistories: function (resourceName, id) {
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

         logOut: function () {
         localStorage.removeItem('access_token');
         localStorage.removeItem('refresh_token');
         window.location.href = window.location.origin;
         }*/
    };

    module.exports = apiUtil;

})();
