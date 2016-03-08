;(function () {
    'use strict';

    //constants
    var resourceConstant = require('../constants/resourceConstant');
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var Immutable = require('immutable');


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