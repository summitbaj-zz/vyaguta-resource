/**
 * Created by pratishshr on 2/15/16.
 */

'use strict';

var request = require('superagent');
var url = 'http://localhost:3000/';
var data = [];

var ApiUtil = {
    fetchById: function (resourceName, id, callback) {
        request
            .get(url + resourceName + "/" + id)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    data = res.body;
                } else {
                    console.log('error');
                }
                callback(data);
            })
    },

    fetchAll: function (resourceName, callback) {
        request
            .get(url + resourceName)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    data = res.body;
                } else {
                    console.log('error');
                }
                callback(data);
            });
    },

    create: function (resourceName, data, callback) {
        request
            .post(url + resourceName)
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    data = res.body;
                } else {
                    console.log('error')
                }
                callback(data);

            });
    },

    edit: function (resourceName, data, dataId, callback) {
        request
            .put(url + resourceName + '/' + dataId)
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (!err) {
                    data = res.body;
                } else {
                    console.log('error')
                }
                callback(data);
            });
    },

    delete: function (resourceName, dataId, callback) {
        request
            .delete(url + resourceName + '/' + dataId)
            .end(function (err, res) {
                if (!err) {
                    console.log('success');
                } else {
                    console.log('error');
                }
                callback(dataId);
            });
    }
}

module.exports = ApiUtil;