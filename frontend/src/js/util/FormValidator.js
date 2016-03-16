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
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isRequired = function (formDatas) {
            for (var key in formDatas) {
                if (formDatas[key] == '') {
                    that.errors[key] = 'This field is required';
                }
                 else{
                    delete that.errors[key];
                }
                if (key=='email' && !emailRegex.test(formDatas['email'])) {
                    that.errors['email'] = 'Please enter a valid email';
                }
            }
            return ((Object.keys(that.errors).length == 0) ? true : false);
        }
    }

    module.exports = new FormValidator();

})();