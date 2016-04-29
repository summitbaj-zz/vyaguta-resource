/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstants');

    /**
     * These are the actions dispatched whenever the API is used
     */

    var apiActions = {
        //Everytime an API request is made, this action gets called
        apiRequest: function (entity) {
            return {
                type: actionTypeConstant.API_REQUEST,
                entity: entity
            }
        },

        //Everytime a response is received, this action gets called
        apiResponse: function (entity) {
            return {
                type: actionTypeConstant.API_RESPONSE,
                entity: entity
            }
        },

        //Everytime a component unmounts, this action gets called
        apiClearState: function () {
            return {
                type: actionTypeConstant.API_CLEAR_STATE
            }
        }
    };

    module.exports = apiActions;

})();
