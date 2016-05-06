;(function () {
    'use strict';

    //constants
    var actionTypeConstants = require('../constants/actionTypeConstants');

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
                contracts: []
            },
            projectRoles: {},
            budgetTypes: {},
            projectTypes: {},
            clients: {},
            projectStatus: {}
        },
        pagination: {},
    };


    var crudReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstants.LIST:
                var newState = _.cloneDeep(state);
                newState[action.entity] = _.cloneDeep(action.data.data);
                return newState;


            case actionTypeConstants.SELECT_ITEM:
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity] = action.data;
                return newState;

            case actionTypeConstants.DELETE:
                var newState = _.cloneDeep(state);
                var data = newState[action.entity];
                var index = _.indexOf(data, _.find(data, {id: action.id}));
                data.splice(index, 1);

                return newState;

            case actionTypeConstants.UPDATE_SELECTED_ITEM:
                var newState = _.cloneDeep(state);

                newState.selectedItem[action.entity][action.key] = action.value;
                return newState;

            case actionTypeConstants.HANDLE_SELECT_OPTION_CHANGE:
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity][action.key] = (action.value == 0) ? null : {id: action.value};
                return newState;

            case actionTypeConstants.CLEAR_SELECTED_ITEM:
                var newState = _.cloneDeep(state);
                newState.selectedItem[action.entity] = {};
                return newState;

            case actionTypeConstants.CLEAR_LIST:
                var newState = _.cloneDeep(state);
                newState[action.entity] = {};
                return newState;

            case actionTypeConstants.PAGINATION_INDEX:
                var newState = _.cloneDeep(state);
                newState.pagination.startPage = action.index;
                newState.pagination.count = action.count;
                return newState;

            case actionTypeConstants.HANDLE_AUTOCOMPLETE_CHANGE:
                var newState = _.cloneDeep(state);
                var employeeName = action.label && action.label.split(' ');

                if (!employeeName) {
                    newState.selectedItem[action.entity][action.key] = {
                        id: action.id,
                    };
                } else if (employeeName.length == 2) {
                    newState.selectedItem[action.entity][action.key] = {
                        id: action.id,
                        firstName: employeeName[0],
                        lastName: employeeName[1]
                    };
                } else {
                    newState.selectedItem[action.entity][action.key] = {
                        id: action.id,
                        firstName: employeeName[0],
                        middleName: employeeName[1],
                        lastName: employeeName[2]
                    };
                }
                return newState;

            default:
                return state;
        }
    };

    module.exports = crudReducer;

})();