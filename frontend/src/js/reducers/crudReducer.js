;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');
    var Immutable = require('immutable');

    var initialState = {
            projectStatus: [],
            budgetTypes: [],
            projectTypes: [],
            projects: []
        };

    var crudReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST:
                return state.set(action.entity, action.data);

            case actionTypeConstant.DELETE:
                var data = JSON.parse(JSON.stringify(state.get(action.entity)));
                var index = _.indexOf(data, _.find(data, {id: action.id}));

                data.splice(index, 1);

                return state.set(action.entity, data);

            case actionTypeConstant.API_RESPONSE:
                var newState = _.cloneDeep(state);
                newState.budgetTypes = _.cloneDeep(action.data);
                return newState;

            default:
                return state;
        }
    };

    module.exports = crudReducer;

})();