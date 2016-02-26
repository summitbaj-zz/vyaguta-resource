;(function () {
    'use strict';

    var Immutable = require('immutable');

    var actionTypeConstant = require('../constants/actionTypeConstant');
    var _ = require('lodash');

    var initialState = Immutable.Map(
        {projectStatus: [],
        budgetTypes: [],
        projectTypes: [],
        projects: []}
    );

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

            default:
                return state;
        }
    }

    module.exports = crudReducer;

})();