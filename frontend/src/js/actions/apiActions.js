/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    /*
     * These are the actions called whenever the API is used
     */

    var apiActions = {
        ApiRequest: function (entity) {
            //Everytime an API request is made, this action gets called
            return {
                type: actionTypeConstant.API_REQUEST,
                entity: entity
            }
        },

        ApiResponse: function (data) {
            //Everytime a response is received from the API, this action gets called
            return {
                type: actionTypeConstant.API_RESPONSE,
                data: data
            }
        },

        ApiError: function () {
            //When there is an error in the response from the API, this action gets called
            return {
                type: actionTypeConstant.API_ERROR
            }
        }
    }

    module.exports = apiActions;

})();
