;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');

    var initialState = {
        projectStatus: [],
        budgetTypes: [],
        projectTypes: [],
        projects: [],
        selectedItem: { //for editing or viewing purposes
            projects: {
                budgetType: {},
                projectType: {},
                projectStatus: {},
                accountManager: {}
            },
            budgetTypes: {},
            projectTypes: {},
            projectStatus: {}
        }
    };


    var crudReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST:
                var newState = _.cloneDeep(state);
                newState[action.entity] = _.cloneDeep(action.data);

                return newState;

            case actionTypeConstant.SELECT_ITEM:
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity] = action.data;

                return newState;

            case actionTypeConstant.DELETE:
                var newState = _.cloneDeep(state);
                var data = newState[action.entity];
                var index = _.indexOf(data, _.find(data, {id: action.id}));
                data.splice(index, 1);

                return newState;

            case actionTypeConstant.UPDATE_SELECTED_ITEM:
                console.log(action.entity);
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity][action.key] = action.value;

                return newState;

            default:
                return state;
        }
    };

    module.exports = crudReducer;

})();