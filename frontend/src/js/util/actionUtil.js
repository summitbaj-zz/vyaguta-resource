;(function () {
    'use strict';

    //API utility
    var apiUtil = require('../util/apiUtil');

    //actions
    var apiActions = require('../actions/apiActions');

    //constants
    var urlConstant = require('../constants/urlConstant');
    var messageConstant = require('../constants/messageConstant');

    //libraries
    var Toastr = require('toastr');

    var actionUtil = {
        responseError: function (dispatch, error, entity, callback) {
            if (error.status == 401) {
                dispatch(apiActions.apiRequest(entity));
                apiUtil.refreshSession().then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    dispatch(callback);
                });
            } else if (error.status == 404) {
                browserHistory.push(urlConstant.PAGE_NOT_FOUND);
            } else if (error.status == 400) {
                var message = error.response.body.error || error.response.body[0].error;
                if (message.indexOf(messageConstant.FOREIGN_KEY_VIOLATION_MESSAGE) > -1) {
                    message = messageConstant.UNSUCCESSFUL_DELETE_MESSAGE;
                }
                Toastr.error(message, messageConstant.TOASTR_INVALID_HEADER);
            } else {
                Toastr.error(error.response.body.error || error.response.body[0].error, messageConstant.TOASTR_INVALID_HEADER);
            }
        },

        isSameRoute: function (state, oldRoute) {
            var currentRoute = state().routing.locationBeforeTransitions.pathname;
            return oldRoute == currentRoute;
        }
    };

    module.exports = actionUtil;

})();