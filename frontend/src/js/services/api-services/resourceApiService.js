;(function () {
    'use strict';

    //utils
    var apiUtil = require('../../util/apiUtil');
    var converter = require('../../util/converter');

    //constants
    var urlConstants = require('../../constants/urlConstants');

    var url = window.location.origin + urlConstants.RESOURCE_SERVER + '/';

    var resourceApiService = {
        fetch: function (pathParam, data) {
            var queryParams = data ? converter.serialize(data) : '';
            return apiUtil.fetch(url, pathParam.toLowerCase(), queryParams);
        },

        create: function (resourceName, data) {
            return apiUtil.create(url, resourceName.toLowerCase(), data);
        },

        edit: function (resourceName, data, dataId) {
            return apiUtil.edit(url, converter.getPathParam(resourceName.toLowerCase(), dataId), data);
        },

        delete: function (resourceName, dataId) {
            return apiUtil.delete(url, converter.getPathParam(resourceName.toLowerCase(), dataId));
        }
    }

    module.exports = resourceApiService;

})();