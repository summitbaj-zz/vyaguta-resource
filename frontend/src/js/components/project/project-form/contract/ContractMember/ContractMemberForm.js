/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function () {

    //React and redux dependencies
    var React = require('react');

    //components
    var AllocationContainer = require('./Allocation/AllocationContainer');
    var SelectOption = require('../../SelectOption');

    //utils
    var alertBox = require('../../../../../utils/alertBox');
    var formValidator = require('../../../../../utils/formValidator');
    var formUtil = require('../../../../../utils/formUtil');

    //services
    var coreApiService = require('../../../../../services/api-services/coreApiService');
    var authApiService = require('../../../../../services/api-services/authApiService');

    //constants
    var messageConstants = require('../../../../../constants/messageConstants');
    var resourceConstants = require('../../../../../constants/resourceConstants');

    //libraries
    var Select = require('react-select');
    var Toastr = require('toastr');

    var ContractMemberForm = React.createClass({
        componentDidMount: function () {
            var that = this;

            $('#addContractMember').modal('show');
            $('#addContractMember').on('hidden.bs.modal', function (event) {
                that.props.toggleModalState(event);
            });
            formUtil.disableKey(13, 'addContractMember');
        },

        renderEmployees: function (key) {
            var employeeName = this.props.employees[key].firstName + ' ' + this.props.employees[key].middleName + ' ' + this.props.employees[key].lastName;
            return (
                <SelectOption key={key} index={key} id={this.props.employees[key].id}
                              option={employeeName}/>
            );
        },

        loadEmployees: function (input) {
            return coreApiService.fetch(resourceConstants.EMPLOYEES, input).then(function (response) {
                var options = [];
                for (var i = 0; i < response.body.data.length; i++) {
                    if (!response.body.data[i].middleName || response.body.data[i].middleName == 'NULL') {
                        var employeeName = response.body.data[i].firstName + ' ' + response.body.data[i].lastName;
                    } else {
                        var employeeName = response.body.data[i].firstName + ' ' + response.body.data[i].middleName + ' ' + response.body.data[i].lastName;
                    }
                    options.push({value: response.body.data[i].id, label: employeeName});
                }
                return {options: options};
            }, function (error) {
                if (error.status == 401) {
                    authApiService.refreshSession();
                }
            });
        },

        isAllocationValid: function () {
            var allocations = this.props.selectedContractMember.allocations || [];
            for (var i = 0; i < allocations.length; i++) {
                if (!allocations[i].joinDate || !allocations[i].endDate) {
                    return false;
                }
            }
            return true;
        },

        isFormValid: function (data) {
            if (!data.employee) {
                Toastr.error(messageConstants.SELECT_TEAM_MEMBER, messageConstants.TOASTR_INVALID_HEADER);
                return false;
            } else if (!this.isAllocationValid()) {
                Toastr.error(messageConstants.FILL_DATES_FOR_ALLOCATIONS, messageConstants.TOASTR_INVALID_HEADER);
                return false;
            }
            return true;
        },

        saveContractMember: function () {
            if (this.props.selectedContractMember.employee &&
                this.props.selectedContractMember.employee.id) {
                var employee = this.props.selectedContractMember.employee
            } else {
                var employee = null;
            }

            var data = {
                employee: employee,
                allocations: this.props.selectedContractMember.allocations
            };

            if (this.isFormValid(data)) {
                if (this.props.memberIndex) {
                    this.props.actions.updateContractMember(this.props.contractIndex, this.props.memberIndex, data);
                } else {
                    this.props.actions.addContractMember(this.props.contractIndex, data);
                }
                $('#addContractMember').modal('hide');
            }
        },

        componentWillUnmount: function () {
            this.props.setMemberIndex(null);
            this.props.actions.clearContractMember();
        },

        deleteContractMember: function () {
            var that = this;

            alertBox.confirm(messageConstants.DELETE_MESSAGE, function () {
                that.props.actions.deleteContractMember(that.props.contractIndex, that.props.memberIndex);
                $('#addContractMember').modal('hide');
            });
        },

        handleAutoCompleteChange: function (employee) {
            var employeeId = employee && employee.value;
            var employeeFullName = employee && employee.label;

            this.props.actions.handleContractMemberSelectOptionChange('employee', employeeId, employeeFullName);
        },

        getAutoCompleteValue: function () {
            var value = this.props.selectedContractMember.employee && this.props.selectedContractMember.employee.id;
            var employee = this.props.selectedContractMember.employee;

            if (employee && employee.id) {
                var firstName = employee.firstName;
                var lastName = employee.lastName;
                var middleName = '';

                if (employee.middleName && employee.middleName != 'NULL') {
                    middleName = employee.middleName + ' ';
                }

                return {
                    value: value,
                    label: firstName + ' ' + middleName + lastName
                }

            } else {
                return null;
            }
        },

        render: function () {
            return (
                <div className="modal fade" id="addContractMember" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="modal-title">Contract Team Members</div>
                            </div>
                            <div className="modal-body">
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <label className="control-label col-md-4">Team Member *</label>
                                        <div className="col-md-8">
                                            <Select.Async name="employee"
                                                          value={this.getAutoCompleteValue()}
                                                          loadOptions={this.loadEmployees}
                                                          onChange={this.handleAutoCompleteChange}
                                                          minimumInput={1}/>
                                        </div>
                                    </div>

                                    <AllocationContainer allocations={this.props.selectedContractMember.allocations}
                                                         actions={this.props.actions}
                                                         projectRoles={this.props.projectRoles}
                                                         memberIndex={this.props.memberIndex}/>

                                </div>
                            </div>
                            <div className="modal-footer">
                                {!this.props.memberIndex &&
                                <button type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={this.saveContractMember}>
                                    <i className="fa fa-plus"></i>
                                    Add Member
                                </button>
                                }
                                {this.props.memberIndex &&
                                <button type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={this.saveContractMember}>
                                    <i className="fa fa-edit"></i>
                                    Update
                                </button>
                                }
                                {this.props.memberIndex &&
                                <button type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={this.deleteContractMember}>
                                    <i className="fa fa-close"></i>
                                    Delete
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    module.exports = ContractMemberForm;

})();