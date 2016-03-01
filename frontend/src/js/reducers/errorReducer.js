;(function () {
    'use strict';

    var Immutable = require('immutable');

    //constants
    var resourceConstant = require('../constants/resourceConstant');
    var actionTypeConstant = require('../constants/actionTypeConstant');

    var initialState = Immutable.Map(
        {errorMessage:[]}

    );

    var errorReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.ERROR:
                return state.set(resourceConstant.ERROR_MESSAGE, action.data);
            default:
                return state.set(resourceConstant.ERROR_MESSAGE, '');
        }
    };

    module.exports = errorReducer;

})();