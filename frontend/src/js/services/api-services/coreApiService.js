;(function () {
    'use strict';

    //utils
    var apiUtil = require('../../utils/apiUtil');
    var converter = require('../../utils/converter');

    //constants
    var urlConstants = require('../../constants/urlConstants');

    var url = window.location.origin + urlConstants.CORE_SERVER + '/';

    var coreApiService = {
        fetch: function (pathParam, data) {
            var queryParams = data ? converter.serialize(data) : '';
            return apiUtil.fetch(url, pathParam.toLowerCase(), queryParams);
        }
    }

    module.exports = coreApiService;

})();