;(function () {
    'use strict';

    //constants
    var messageConstant = require('../constants/messageConstants');

    //services
    var resourceApiService = require('../services/api-services/resourceApiService');

    function formValidator() {
        var that = this;
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isEmailValid = true;
        var newEvent;

        this.isValid = function (formDatas) {
            var error;
            for (var key in formDatas) {
                if (formDatas[key] == '') {
                    this.showErrors(key, messageConstant.REQUIRED_MESSAGE);
                    error = true;
                    break;
                }
            }
            if (!error && isEmailValid) {
                return true;
            } else {
                return false;
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

        this.showSuccess = function (elementId) {
            var parentElement = $('#' + elementId).parent();

            if (!parentElement.hasClass('has-success')) {
                parentElement.addClass('has-success');
            }
        }

        this.removeFeedback = function (elementId) {
            var parentElement = $('#' + elementId).parent();
            parentElement.removeClass('has-error');
            parentElement.removeClass('has-success');
            parentElement.children('span').html('');
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
                isEmailValid = false;
                that.showErrors('email', messageConstant.INVALID_EMAIL_MESSAGE);
            } else {
                isEmailValid = true;
            }
        }
    }

    module.exports = new formValidator();

})();