;(function () {
    'use strict';

    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //API utility
    var apiUtil = require('../util/apiUtil');

    //actions
    var apiActions = require('../actions/apiActions');

    //constants
    var urlConstant = require('../constants/urlConstants');
    var messageConstant = require('../constants/messageConstants');

    //libraries
    var Toastr = require('toastr');

    var actionUtil = {
        responseError: function (dispatch, error, entity, callback) {
            switch (error.status) {
                case 400:
                    var message = error.response.body.error || error.response.body[0].error;
                    if (message.indexOf(messageConstant.FOREIGN_KEY_VIOLATION_MESSAGE) > -1) {
                        message = messageConstant.UNSUCCESSFUL_DELETE_MESSAGE;
                    }
                    Toastr.error(message, messageConstant.TOASTR_INVALID_HEADER);
                    break;

                case 401:
                    dispatch(apiActions.apiRequest(entity));
                    apiUtil.refreshSession().then(function (response) {
                        dispatch(apiActions.apiResponse(entity));
                        dispatch(callback);
                    });
                    break;

                case 404:
                    browserHistory.push(urlConstant.PAGE_NOT_FOUND);
                    break;

                default:
                    Toastr.error(error.response.body.error || error.response.body[0].error, messageConstant.TOASTR_INVALID_HEADER);
                    break;
            }
        },

        isSameRoute: function (state, oldRoute) {
            var currentRoute = state().routing.locationBeforeTransitions.pathname;
            return oldRoute == currentRoute;
        }
    };

    module.exports = actionUtil;

})();