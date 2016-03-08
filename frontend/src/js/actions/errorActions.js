;(function () {
    'use strict';

    var store = require('../store/store');
    var actionTypeConstant = require('../constants/actionTypeConstant');

    var errorActions = {
        getError: function (error) {
            store.dispatch({
                type: actionTypeConstant.ERROR,
                data: error.message
            })
        }
    };

    module.exports = errorActions;

})();