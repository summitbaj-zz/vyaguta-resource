;(function () {
    'use strict';
    var moment = require('moment');

    function historyUtil() {
        var that = this;
        this.getTime = function (createdAt) {
            var date = new Date(moment(createdAt).format());
            var now = new Date();
            var seconds = Math.floor(now - date) / 1000;
            var interval = Math.floor(seconds / 302400);

            if (interval >= 1) {
                var convertedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                return convertedDate;
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                return interval + ' days ago';
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                return interval + ' hours ago';
            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                return interval + ' minutes ago';
            }
            interval = seconds;
            if (interval >= 0) {
                return Math.floor(seconds) + ' seconds ago';
            }
            var convertedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            return convertedDate;
        }

        this.setChangedEntity = function (history) {
            var changedEntity;
            switch (history.changedEntity) {
                case 'Project':
                    changedEntity = 'This project';
                    break;
                case 'Contract':
                    changedEntity = 'Contract';             //Until decided what to do.
                    break;
                case 'ContractMember':
                    changedEntity = that.getAppendedName(history.employee) || 'Contract Member';
                    break;
            }
            return changedEntity;
        }

        this.getAppendedName = function (employee) {
            var name = employee.firstName;
            if (employee.middleName && employee.middleName != 'NULL') {
                name = name.concat(' ', employee.middleName);
            }
            name = name.concat(' ', employee.lastName);
            return name;
        }

        this.convertHistoryJSON = function (history) {
            var convertedHistory = {
                batch: history.batch,
                reason: history.reason,
                createdBy: history.createdBy.name,
                action: history.changed ? 'edited' : 'added',
                createdAt: that.getTime(history.createdAt),
                changedEntity: history.changedEntity,
                changedData: that.setChangedEntity(history),
                fields: {}
            };
            var invalidKeys = ['changed', 'changedEntity', 'createdBy', 'createdAt', 'employee', 'reason', 'batch', 'contractMember'];

            for (var key in history) {
                if (!(invalidKeys.indexOf(key) > -1) && ((history[key] != null && history[key] !== '') || (!history[key] && history.changed))) {
                    convertedHistory.fields[key] = that.getDisplayableData(key, history[key]);
                }
            }
            return convertedHistory;
        }

        this.getDisplayableData = function (key, value) {
            var fieldData = null;
            if (value != null && typeof (value) === 'object') {
                fieldData = that.getDisplayableDataFromObject(key, value);
            } else {
                fieldData = value;
            }
            return fieldData;
        }

        this.getDisplayableDataFromObject = function (key, value) {
            switch (key) {
                case 'accountManager':
                    return this.getAppendedName(value);
                case 'client':
                    return value.name;
                default:
                    return value.title;
            }
        }
    }

    module.exports = new historyUtil();

})();