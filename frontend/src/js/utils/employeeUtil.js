;(function () {
    'use strict';

    var employeeUtil = {
        getEmployeeName: function(employee){
            var name = '';
            if(employee) {
                employee.middleName = employee.middleName ? employee.middleName + ' ' : '';
                name = name + employee.firstName + ' ' + employee.middleName + employee.lastName;
            }
            return name;
        }
    };

    module.exports = employeeUtil;

})();
