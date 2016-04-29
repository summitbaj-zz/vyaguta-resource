;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    //libraries
    var _ = require('lodash');

    var initialState = {
        projectEnding: [],
        overdue: [],
        inProgressProjects: [],
        resource: {
            utilization:{},
            booked:[],
            available: []
        }
    };


    var dashboardReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST_BY_DATE:
                var newState = _.cloneDeep(state);
                newState[action.projectType] = _.cloneDeep(action.data);
                return newState;

            case actionTypeConstant.LIST_PROJECT_BY_STATUS:
                var newState = _.cloneDeep(state);
                newState.inProgressProjects = action.data.data;

                return newState;

            case actionTypeConstant.SHOW_RESOURCES:
                var newState = _.cloneDeep(state);
                               newState[action.entity][action.resourceType] = action.data;
                return newState;

            default:
                return state;
        }
    };

    module.exports = dashboardReducer;

})();