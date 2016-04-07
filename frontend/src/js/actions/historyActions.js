;(function () {
    'use strict';

    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    //API utility
    var apiUtil = require('../util/apiUtil');

    //actions
    var apiActions = require('./apiActions');

    var actions = {
        list: function (entity, data) {
            return {
                type: actionTypeConstant.LIST_HISTORY,
                entity: entity,
                data: data
            }
        }
    }

    var historyActions = {
        fetchAllHistories: function(entity, id){
            return function (dispatch) {
                dispatch(apiActions.apiRequest(entity));
                return (apiUtil.fetchAllHistories(entity, id).then(function (response) {
                    dispatch(apiActions.apiResponse(entity));
                    dispatch(actions.list(entity, response.body));
                }, function (error) {
                    dispatch(apiActions.apiResponse(entity));
                    if (error.status == 401) {
                        dispatch(apiActions.apiRequest(entity));
                        apiUtil.refreshSession().then(function (response) {
                            dispatch(apiActions.apiResponse(entity));
                            dispatch(historyActions.fetchAllHistories(entity, id));
                        });
                    } else {
                        Toastr.error(error.response.body.error);
                    }
                }));
            }
        }
    }
    module.exports = historyActions;

})();