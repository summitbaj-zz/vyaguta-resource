;(function () {
    'use strict';
    var messageConstant = require('../constants/messageConstant');

    function formValidator() {
        var that = this;
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.validateForm = function (formDatas) {
            for (var key in formDatas) {
                if (formDatas[key] == '') {
                    this.showErrors(key, messageConstant.REQUIRED_MESSAGE);
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

        this.validateField = function (event) {
            var isValid = that.isRequired(event.target.value);
            var elementId = $(event.target).attr('id');
            if (!isValid) {
                that.showErrors(elementId, messageConstant.REQUIRED_MESSAGE);
            } else if (elementId == 'email') {
                that.validateEmail(event.target.value);
            }
        }

        this.validateEmail = function (value) {
            if (!emailRegex.test(value)) {
                that.showErrors('email', messageConstant.INVALID_EMAIL_MESSAGE);
            }
        }
    }

    module.exports = new formValidator();

})();