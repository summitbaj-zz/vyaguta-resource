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
        projectRoles: [],
        clients: [],
        selectedItem: { //for editing or viewing purposes
            projects: {
                budgetType: {},
                projectType: {},
                projectStatus: {},
                accountManager: {},
                client: {},
                contracts:{}
            },
            projectRoles: {},
            budgetTypes: {},
            projectTypes: {},
            clients: {},
            projectStatus: {}
        },
        pagination:{},
        endingProjects:[]
    };


    var crudReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST:
                var newState = _.cloneDeep(state);
                newState[action.entity] = _.cloneDeep(action.data.data);
                return newState;

            case actionTypeConstant.LIST_BY_END_DATE:
                var newState = _.cloneDeep(state);
                newState.endingProjects = _.cloneDeep(action.data);
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
                var newState = _.cloneDeep(state);

                newState.selectedItem[action.entity][action.key] = action.value;
                return newState;

            case actionTypeConstant.HANDLE_SELECT_OPTION_CHANGE:
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity][action.key] = {id: action.value};
                return newState;

            case actionTypeConstant.CLEAR_SELECTED_ITEM:
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity] = {};

                return newState;

            case actionTypeConstant.PAGINATION_INDEX:
                var newState = _.cloneDeep(state);
                newState.pagination.page = action.index;
                newState.pagination.count = action.count;
                return newState;

            default:
                return state;
        }
    };

    module.exports = crudReducer;

})();