/**
 * Created by pratishshr on 2/15/16.
 */

'use strict';

var request = require('superagent');
var url = 'http://localhost:3000/';

var ApiUtil = {
    fetchById: function (resourceName, id, callback) {
        request
            .get(url + resourceName + '/' + id)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    callback(res.body);
                }
            });
    },

    fetchAll: function (resourceName, callback) {
        request
            .get(url + resourceName)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    callback(res.body);
                }
            });
    },

    create: function (resourceName, data, callback) {
        request
            .post(url + resourceName)
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    callback(res.body);
                }
            });
    },

    edit: function (resourceName, data, dataId, callback) {
        request
            .put(url + resourceName + '/' + dataId)
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    callback(res.body);
                }
            });
    },

    delete: function (resourceName, dataId, callback) {
        request
            .delete(url + resourceName + '/' + dataId)
            .end(function (err, res) {
                if (!err) {
                    callback(dataId);
                }
            });
    }
}

module.exports = ApiUtil;