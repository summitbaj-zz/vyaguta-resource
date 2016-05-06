;(function () {
    'use strict';

    //libraries
    var moment = require('moment');

    //services
    var coreApiService = require('./api-services/coreApiService');
    var authApiService = require('./api-services/authApiService');

    //constants
    var resourceConstants = require('../constants/resourceConstants');

    //utils
    var employeeUtil = require('../utils/employeeUtil');

    var contractMemberService = {
        isActive: function (allocations) {
            var todaysDate = moment().startOf('day');

            for (var i = 0; i < allocations.length; i++) {
                var joinDate = moment(allocations[i].joinDate);
                var endDate = moment(allocations[i].endDate);

                if (todaysDate >= joinDate && todaysDate <= endDate) {
                    return true;
                }
            }
            return false;
        },

        isBilled: function (allocations) {
            if (this.isActive(allocations)) {
                var todaysDate = moment().startOf('day');

                for (var i = 0; i < allocations.length; i++) {
                    var joinDate = moment(allocations[i].joinDate);
                    var endDate = moment(allocations[i].endDate);

                    if (allocations[i].billed && todaysDate >= joinDate && todaysDate <= endDate) {
                        return 'Billed';
                    }
                }
                return 'Unbilled';
            }
            return '';
        },

        loadEmployees: function (input) {
            return coreApiService.fetch(resourceConstants.EMPLOYEES, {q: input}).then(function (response) {
                var options = [];
                for (var i = 0; i < response.body.data.length; i++) {
                    options.push({
                        value: response.body.data[i].id,
                        label: employeeUtil.getEmployeeName(response.body.data[i])
                    });
                }
                return {options: options};

            }, function (error) {
                if (error.status == 401) {
                    authApiService.refreshSession();
                }
            });
        },

        getAutoCompleteValue: function (employee) {
            if (employee && employee.id) {
                return {
                    value: employee.id,
                    label: employeeUtil.getEmployeeName(employee)
                }
            } else {
                return null;
            }
        }
    };

    module.exports = contractMemberService;

})();