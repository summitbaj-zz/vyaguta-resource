;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');

    var initialState = {
        endingProjects: [],
        inProgressProjects: [],
        resourceUtilization: {}
    };


    var dashboardReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST_BY_END_DATE:
                var newState = _.cloneDeep(state);
                newState.endingProjects = _.cloneDeep(action.data);
                return newState;

            case actionTypeConstant.LIST_PROJECT_BY_STATUS:
                var newState = _.cloneDeep(state);
                newState.inProgressProjects = action.data.data;

                return newState;

            case actionTypeConstant.SHOW_RESOURCES:
                var newState = _.cloneDeep(state);
                newState[action.entity] = action.data;

                return newState;

            default:
                return state;
        }
    };

    module.exports = dashboardReducer;

})();