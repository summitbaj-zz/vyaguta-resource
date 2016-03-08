/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    /**
     * These are the actions called whenever the API is used
     *
     * @type {{ApiRequest: apiActions.ApiRequest, ApiResponse: apiActions.ApiResponse, ApiError: apiActions.ApiError}}
     */

    var apiActions = {
        apiRequest: function (entity) {
            //Everytime an API request is made, this action gets called
            return {
                type: actionTypeConstant.API_REQUEST,
                entity: entity
            }
        },

        apiResponse: function (entity) {
            //Everytime a response is received from the API, this action gets called
            return {
                type: actionTypeConstant.API_RESPONSE,
                entity: entity,
            }
        },

        apiError: function () {
            //When there is an error in the response from the API, this action gets called
            return {
                type: actionTypeConstant.ERROR,
                data: error.message
            }
        }
    }

    module.exports = apiActions;

})();
