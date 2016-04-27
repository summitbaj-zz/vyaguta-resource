/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/3/16.
 */

;(function () {
//libraries
    var _ = require('lodash');

    var convertContractHash = {
        toFrontEndHash: function (contracts) {
            for (var i = 0; i < contracts.length; i++) {
                var newContractMembers = [];
                for (var j = 0; j < contracts[i].contractMembers.length; j++) {
                    var allocations = [];
                    var employee = {'employee': contracts[i].contractMembers[j].employee};
                    var allocationObject = _.extend({}, contracts[i].contractMembers[j]);

                    delete allocationObject.employee;
                    allocations.push(allocationObject);

                    for (var k = j + 1; k < contracts[i].contractMembers.length; k++) {
                        if (contracts[i].contractMembers[j].employee.id == contracts[i].contractMembers[k].employee.id) {

                            employee = {'employee': contracts[i].contractMembers[k].employee};
                            allocationObject = _.extend({}, contracts[i].contractMembers[k]);
                            delete allocationObject.employee;
                            allocations.push(allocationObject);
                            contracts[i].contractMembers.splice(k, 1);
                            k--;
                        }
                    }

                    var newContractMemberObject = _.extend({}, employee, {allocations: allocations});
                    newContractMembers.push(newContractMemberObject);
                }
                contracts[i].contractMembers = newContractMembers;
            }
            console.log(contracts);
            return contracts;
        },

        toBackEndHash: function (contracts) {
            var contracts = _.cloneDeep(contracts);

            for (var i = 0; i < contracts.length; i++) {
                var newContractMembers = [];
                for (var j = 0; j < contracts[i].contractMembers.length; j++) {
                    var allocations = contracts[i].contractMembers[j].allocations;
                    delete contracts[i].contractMembers[j].allocations;
                    for (var k = 0; k < allocations.length; k++) {
                        var newContractMemberObject = _.extend({}, contracts[i].contractMembers[j], allocations[k]);
                        newContractMembers.push(newContractMemberObject);
                    }
                }
                contracts[i].contractMembers = newContractMembers;
            }
            return contracts;
        },

        toTimelineHash: function (contracts) {
            var contracts = _.cloneDeep(contracts);
            //projectMembers
            var lanes = [];
            //allocations
            var items = [];

            var containsObject = function (list, obj) {
                for (var i = 0; i < list.length; i++) {
                    if (_.isEqual(list[i], obj)) {
                        return true;
                    }
                }
                return false;
            };

            for (var i = 0; i < contracts.length; i++) {
                for (var j = 0; j < contracts[i].contractMembers.length; j++) {
                    var contractMember = contracts[i].contractMembers[j];
                    if (!containsObject(lanes, contractMember.employee)) {
                        lanes.push(contractMember.employee);
                    }
                    for (var k = 0; k < contractMember.allocations.length; k++) {
                        var allocation = contractMember.allocations[k];
                        allocation.lane = j;
                        allocation.id = allocation.allocation;
                        allocation.start = allocation.joinDate;
                        allocation.end = allocation.endDate;
                        delete allocation.joinDate;
                        delete allocation.endDate;
                        items.push(contractMember.allocations[k]);
                    }
                }
            }

            for (var i = 0; i < lanes.length; i++) {
                lanes[i].id = i;
                lanes[i].label = lanes[i].firstName
            }

            var newHash = {
                lanes: lanes,
                items: items
            }

            return newHash;
        }
    }

    module.exports = convertContractHash;
})();