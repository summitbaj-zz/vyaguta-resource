;(function () {
    'use strict';

    //API utility
    var apiUtil = require('../util/apiUtil');

    //actions
    var apiActions = require('../actions/apiActions');

    //constants
    var urlConstant = require('../constants/urlConstant');

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
                } else {
                    Toastr.error(error.response.body.error || error.response.body[0].error);
                }
            },

            isSameRoute: function (state, oldRoute) {
                var currentRoute = state().routing.locationBeforeTransitions.pathname;
                return oldRoute == currentRoute;
            }
        };

    module.exports = actionUtil;

})();