;(function () {
    'use strict';
    var moment = require('moment');

    function historyService() {
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
                    changedEntity = 'Project';
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

        this.getChangedFields = function (history) {
            var convertedHistory = {
                action: history.changed ? 'edited' : 'added',
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

        this.convertHistoryJSON = function (history) {
            var historyArray = [];
            for (var i = history.length - 1; i >= 0; i--) {
                if (i == history.length - 1) {
                    var historyItem = this.createHistoryItem(history[i]);
                    historyItem.id = i;
                    historyItem.changes = [];
                    historyItem.changes.push(this.getChangedFields(history[i]));
                } else if (history[i].batch == history[i + 1].batch) {
                    historyItem.changes.push(this.getChangedFields(history[i]));
                } else {
                    historyArray.push(historyItem);
                    historyItem = this.createHistoryItem(history[i]);
                    historyItem.id = i;
                    historyItem.changes = [];
                    historyItem.changes.push(this.getChangedFields(history[i]));
                }
            }
            historyItem && historyArray.push(historyItem);
            return historyArray;
        }

        this.createHistoryItem = function (history) {
            return {
                reason: history.reason,
                createdBy: history.createdBy.name,
                createdAt: that.getTime(history.createdAt),
                action: history.changed ? 'edited' : 'added'
            };
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

    module.exports = new historyService();

})();