;(function () {
    'use strict';

    var Immutable = require('immutable');

    var actionTypeConstant = require('../constants/actionTypeConstant');

    var initialState = Immutable.Map(
        {projectStatus: []}
    );

    var crudReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.LIST:
            case actionTypeConstant.DELETE:
                return state.set(action.entity, action.data);

            default:
                return state;
        }
    }

    module.exports = crudReducer;

})();