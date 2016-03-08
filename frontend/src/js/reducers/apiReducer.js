/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/3/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');


    var initialState = {
        isRequesting: false
    };

    var apiReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.API_REQUEST:
                var newState = _.cloneDeep(state);
                newState.isRequesting = true;
                return newState;

            case actionTypeConstant.API_RESPONSE:
                var newState = _.cloneDeep(state);
                newState.isRequesting = false;
                return newState;

            case actionTypeConstant.API_ERROR:
                var newState = _.cloneDeep(state);
                newState.isRequesting = false;
                return newState;

            default:
                return state;
        }

    }

    module.exports = apiReducer;

})();