var Immutable = require('immutable');
var _ = require('lodash');

var actionTypeConstant = require('../constants/actionTypeConstant');

var initialState = Immutable.Map(
    {projectStatus: [{'name':'bish', id:2}]}
);

var PROJECT_STATUS = 'projectStatus';
crudReducer = function (state, action) {

    state = state || initialState;
    switch (action.type) {
        case actionTypeConstant.LIST:
            return state.set('projectStatus', action.data);
        case actionTypeConstant.DELETE:
            return state.set('projectStatus', action.data);

        default:
            return state;
    }
}

module.exports = crudReducer;