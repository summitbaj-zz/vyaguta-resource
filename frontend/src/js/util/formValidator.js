;(function () {
    'use strict';
    var messageConstant = require('../constants/messageConstants');

    var apiUtil = require('./apiUtil');
    var Promise = require('promise');

    function formValidator() {
        var that = this;
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isTitleNameValid = true;
        var isEmailValid = true;
        var newEvent;

        this.isValid = function (formDatas) {
            var error;
            for (var key in formDatas) {
                if (formDatas[key] == '') {
                    this.showErrors(key, messageConstant.REQUIRED_MESSAGE);
                    error = true;
                }
            }
            if (!error && isTitleNameValid && isEmailValid) {
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

            if (parentElement.hasClass('has-error')) {
                parentElement.removeClass('has-error');
            }
            if (parentElement.hasClass('has-success')) {
                parentElement.removeClass('has-success');
            }
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

        this.isTitleValid = function (entity, event) {
            var elementId = $(event).attr('id');
            return new Promise(function (resolve, reject) {
                apiUtil.fetchByTitle(entity, event.value).then(function (response) {
                    if (response.body.count) {
                        isTitleNameValid = false;
                        that.showErrors(elementId, messageConstant.PROJECT_NAME_EXISTS_MESSAGE);
                        resolve(false);
                    } else {
                        isTitleNameValid = true;
                        that.showSuccess(elementId);
                        resolve(true);
                    }
                }, function (error) {
                    reject(error);
                });
            });

        }
    }

    module.exports = new formValidator();

})();