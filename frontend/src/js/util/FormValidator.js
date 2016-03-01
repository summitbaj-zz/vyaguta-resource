/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/21/16.
 */

;(function () {
    'use strict';

    function FormValidator() {
        this.errors;

        var that = this;

        this.isValid = function(formDatas) {
            that.errors = {};

            for(var key in formDatas) {
                if(formDatas[key] == "" && key != 'projectMember' && key != 'tag') {
                    that.errors[key] = "Should not be left empty";
                }
            }
            return ((Object.keys(that.errors).length == 0)?true:false);
        }

    }

    module.exports = new FormValidator();

})();