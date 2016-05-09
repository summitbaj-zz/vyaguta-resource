;(function () {
    'use strict';

    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //services
    var authApiService = require('./api-services/authApiService');

    //actions
    var apiActions = require('../actions/apiActions');

    //constants
    var urlConstants = require('../constants/urlConstants');
    var messageConstants = require('../constants/messageConstants');

    //libraries
    var Toastr = require('toastr');

    var actionService = {
        responseError: function (dispatch, error, callback) {
            dispatch(apiActions.apiResponse());
            switch (error.status) {
                case 400:
                    var message = error.response.body.error || error.response.body[0].error;
                    if (message.indexOf(messageConstants.FOREIGN_KEY_VIOLATION_MESSAGE) > -1) {
                        message = messageConstants.UNSUCCESSFUL_DELETE_MESSAGE;
                    }
                    Toastr.error(message, messageConstants.TOASTR_INVALID_HEADER);
                    break;

                case 401:
                    dispatch(apiActions.apiRequest());
                    authApiService.refreshSession().then(function (response) {
                        dispatch(apiActions.apiResponse());
                        dispatch(callback);
                    });
                    break;

                case 404:
                    browserHistory.push(urlConstants.PAGE_NOT_FOUND);
                    break;

                default:
                    Toastr.error(error.response.body.error || error.response.body[0].error, messageConstants.TOASTR_INVALID_HEADER);
                    break;
            }
        },

        isSameRoute: function (state, oldRoute) {
            var currentRoute = state().routing.locationBeforeTransitions.pathname;
            return oldRoute == currentRoute;
        }
    };

    module.exports = actionService;

})();