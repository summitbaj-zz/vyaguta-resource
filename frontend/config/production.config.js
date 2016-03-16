;(function () {
    'use strict';
    //constants
    var urlConstants = require('../src/js/constants/urlConstant');

    var config = {
        resourceServer: window.location.origin + urlConstants.RESOURCE_SERVER + '/',
        coreServer: window.location.origin + urlConstants.CORE_SERVER + '/'
    };
    module.exports = config;

})();

