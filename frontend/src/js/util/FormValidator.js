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
        var REQUIRED_MESSAGE = 'This field is required.';
        var INVALID_EMAIL_MESSAGE = 'Enter email address in the format someone@example.com.';
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /*this.isRequired = function (formDatas) {
         for (var key in formDatas) {
         if (formDatas[key] == '') {
         that.errors[key] = 'This field is required.';
         }
         else {
         delete that.errors[key];
         }
         if (key == 'email' && !emailRegex.test(formDatas['email'])) {
         that.errors['email'] = 'Enter email address in the format someone@example.com.';
         }
         }
         return ((Object.keys(that.errors).length == 0) ? true : false);
         }*/
        this.validateForm = function (formDatas) {
            for (var key in formDatas) {
                if (formDatas[key] == '') {
                    this.showErrors(key, REQUIRED_MESSAGE);
                }
            }
        }

        this.isRequired = function (value) {
            if (value == '') {
                return false;
            } else {
                return true;
            }
        }

        this.showErrors = function (elementId, message) {
            var parentElement = $('#' + elementId).parent();

            if (!parentElement.hasClass('has-error')) {
                parentElement.addClass('has-error');
            }
            parentElement.children('span').html(message);
        }

        this.removeError = function (elementId) {
            var parentElement = $('#' + elementId).parent();

            if (parentElement.hasClass('has-error')) {
                parentElement.removeClass('has-error');
            }
           parentElement.children('span').html('');
        }

        this.isValid = function () {
            if ($('.has-error').length == 0)
                return true;
            else
                return false;
        }

        this.validateField = function(event){
            var isValid = that.isRequired(event.target.value);
            var elementId = $(event.target).attr('id');
            if(!isValid){
                that.showErrors(elementId, REQUIRED_MESSAGE);
            }else if(elementId == 'email'){
                that.validateEmail(event.target.value);
            }
        }

        that.validateEmail = function(value){
            if(!emailRegex.test(value)){
                that.showErrors('email', INVALID_EMAIL_MESSAGE);
            }
        }
    }

    module.exports = new FormValidator();

})();