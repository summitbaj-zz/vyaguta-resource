/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/3/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    //libraries
    var _ = require('lodash');

    var initialState = {
        isRequesting: false,
        numberOfRequests: 0
    };

    var apiReducer = function (state, action) {
        state = state || initialState;

        switch (action.type) {
            case actionTypeConstant.API_REQUEST:
                var newState = _.cloneDeep(state);
                newState.isRequesting = true;
                newState.numberOfRequests++;

                return newState;

            case actionTypeConstant.API_RESPONSE:
                var newState = _.cloneDeep(state);
                newState.numberOfRequests--;

                //set it false only if all responses are received
                if (newState.numberOfRequests <= 0) {
                    newState.isRequesting = false;
                }

                return newState;

            case actionTypeConstant.API_CLEAR_STATE:
                var newState = _.cloneDeep(state);
                newState.numberOfRequests = 0;
                newState.isRequesting = false;

                return newState;

            default:
                return state;
        }

    }

    module.exports = apiReducer;

})();