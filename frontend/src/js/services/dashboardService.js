;(function () {
    'use strict';

    //services
    var convertContractHash = require('./convertContractHash');

    //libraries
    var moment = require('moment');

    var dashboardService = {
        calculateTotalResource: function (resource) {
            var total = 0;
            for (var i = 0; i < resource.length; i++) {
                total += resource[i].numberOfProjects;
            }
            return total;
        },

        calculatePercentage(number, total){
            var percentage = (number / total) * 100 || 0;
            return Math.round(percentage * 100) / 100 + '%';
        },

        isEnding: function (date) {
            var date1 = new Date();
            var date2 = new Date(date);
            var timeDiff = date2.getTime() - date1.getTime();
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays <= 15 && diffDays >= 0) {
                return true;
            }
        },

        getEndingProjectsData: function (endingProjects) {
            var that = this;
            var endingProjectsArray = [];
            var id = 0;

            for (var i = 0; i < endingProjects.length; i++) {
                var endingContracts = convertContractHash.toFrontEndHash(endingProjects[i].contracts);
                for (var j = 0; j < endingContracts.length; j++) {
                    if (that.isEnding(endingContracts[j].endDate)) {
                        var endingProjectObject = {
                            id: id,
                            projectId: endingProjects[i].id,
                            endDate: endingContracts[j].endDate,
                            project: endingProjects[i].title,
                            resources: this.getCurrentContractMembers(endingContracts[j].contractMembers)
                        };
                        id++;
                        endingProjectsArray.push(endingProjectObject);
                    }
                }
            }
            return endingProjectsArray;
        },

        getCurrentContractMembers: function (members) {
            var todaysDate = moment().startOf('day');
            var total = 0;
            for (var i = 0; i < members.length; i++) {
                for (var j = 0; j < members[i].allocations.length; j++) {
                    var allocation = members[i].allocations[j];
                    var joinDate = moment(allocation.joinDate);
                    var endDate = moment(allocation.endDate);
                    if (todaysDate >= joinDate && todaysDate <= endDate) {
                        total++;
                        break;
                    }
                }
            }
            return total;
        },

        getEndingProjectsResourceTotal: function (endingProjects) {
            var resources = 0;
            for (var i = 0; i < endingProjects.length; i++) {
                resources += parseInt(endingProjects[i].resources);
            }
            return resources;
        },

        getEmployeeName: function (employee) {
            var employee = employee || {};
            var name = '';
            name = name + employee.firstName;
            if (employee.middleName && employee.middleName != 'NULL') {
                name = name + ' ' + employee.middleName;
            }
            name = name + ' ' + employee.lastName;
            return name;
        },

        addDayInDate: function (value) {
            var today = new Date();
            var newDate = new Date();
            newDate.setDate(today.getDate() + value);
            return newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2);
        }
    };

    module.exports = dashboardService;

})();