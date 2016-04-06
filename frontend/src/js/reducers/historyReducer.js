;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');

    var initialState = {
        project: []
    };

    var historyReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST:
                var newState = _.cloneDeep(state);
                newState.project = _.cloneDeep(action.data);
                console.log(state.project)
                console.log(action.entity)
                return newState;

            default:
                return state;
        }
    };

    module.exports = historyReducer;

})();