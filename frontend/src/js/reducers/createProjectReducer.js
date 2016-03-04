/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');

    var initialState = {
        teamMembers: [],
        memberIndexInModal: ''
    };

    var createProjectReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.ADD_TEAM_MEMBER:
                var newState = _.cloneDeep(state);
                newState.teamMembers.push(action.data);
                return newState;

            case actionTypeConstant.EDIT_TEAM_MEMBER:
                var newState = _.cloneDeep(state);
                newState.teamMembers[action.index] = action.data;
                return newState;

            case actionTypeConstant.DELETE_TEAM_MEMBER:
                var newState = _.cloneDeep(state);
                newState.teamMembers.splice(action.index, 1);
                return newState;

                case actionTypeConstant.CLEAR_MEMBER_INDEX:
                    var newState = _.cloneDeep(state);
                    newState.memberIndexInModal = '';
                return newState;

            case actionTypeConstant.EDIT_TEAM_MEMBER_INDEX_IN_MODAL:
                var newState = _.cloneDeep(state);
                newState.memberIndexInModal = action.index;
                return newState;

            default:
                return state;
        }
    }

    module.exports = createProjectReducer;
})();