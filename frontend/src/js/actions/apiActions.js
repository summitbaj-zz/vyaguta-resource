/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //constants
    var actionTypeConstant = require('../constants/actionTypeConstant');

    //components
    var ajaxLoader = require('../util/ajaxLoader');

    /**
     * These are the actions dispatched whenever the API is used
     */

    var apiActions = {
        apiRequest: function (entity) {
            //Everytime an API request is made, this action gets called
            ajaxLoader.show();
            return {
                type: actionTypeConstant.API_REQUEST,
                entity: entity
            }
        },

        apiResponse: function (entity) {
            //Everytime a response is received, this action gets called
            ajaxLoader.hide();
            return {
                type: actionTypeConstant.API_RESPONSE,
                entity: entity
            }
        }
    };

    module.exports = apiActions;

})();
