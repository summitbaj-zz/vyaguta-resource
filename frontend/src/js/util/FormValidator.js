/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/21/16.
 */

;(function () {
    'use strict';

    function FormValidator() {
        this.errors = {};

        var that = this;

        this.isRequired = function (formDatas) {
            for (var key in formDatas) {
                if (formDatas[key] == '') {
                    that.errors[key] = 'This field is required';
                } else {
                    delete that.errors[key];
                }
            }
            return ((Object.keys(that.errors).length == 0) ? true : false);
        }

    }

    module.exports = new FormValidator();

})();