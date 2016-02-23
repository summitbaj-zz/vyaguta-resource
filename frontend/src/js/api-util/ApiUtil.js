/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    var request = require('superagent');
    var url = 'http://localhost:3000/';

    var ApiUtil = {
        fetchById: function (resourceName, id, callback) {
            request
                .get(url + resourceName.toLowerCase() + "/" + id)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (!err) {
                        callback(res.body);
                    } else {
                        console.log('error');
                    }

                });
        },

        fetchAll: function (resourceName, callback) {
            request
                .get(url + resourceName.toLowerCase())
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (!err) {
                        callback(res.body);
                    } else {
                        console.log('error');
                    }
                });
        },

        create: function (resourceName, data, callback) {
            request
                .post(url + resourceName.toLowerCase())
                .send(data)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (!err) {
                        callback(res.body);
                    } else {
                        console.log('error')
                    }
                });
        },

        edit: function (resourceName, data, dataId, callback) {
            request
                .put(url + resourceName.toLowerCase() + '/' + dataId)
                .send(data)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (!err) {
                        callback(res.body);
                    } else {
                        console.log('error')
                    }
                });
        },

        delete: function (resourceName, dataId, callback) {
            request
                .delete(url + resourceName.toLowerCase() + '/' + dataId)
                .end(function (err, res) {
                    if (!err) {
                        callback(dataId);
                    } else {
                        console.log('error');
                    }
                });
        }
    };

    module.exports = ApiUtil;

})();