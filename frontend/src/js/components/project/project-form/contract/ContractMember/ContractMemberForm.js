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
    var employeeUtil = require('../../../../../utils/employeeUtil');

    //services
    var contractMemberService = require('../../../../../services/contractMemberService');

    //constants
    var messageConstants = require('../../../../../constants/messageConstants');

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
            var employeeName = employeeUtil.getEmployeeName(this.props.employees[key]);
            return (
                <SelectOption key={key} index={key} id={this.props.employees[key].id}
                              option={employeeName}/>
            );
        },

        isAllocationValid: function () {
            var allocations = this.props.selectedContractMember.allocations;
            for (var i = 0; i < allocations.length; i++) {
                if (!allocations[i].joinDate || !allocations[i].endDate) {
                    return false;
                }
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
            if (!data.employee) {
                Toastr.error(messageConstants.SELECT_TEAM_MEMBER, messageConstants.TOASTR_INVALID_HEADER);
            } else if (!this.isAllocationValid()) {
                Toastr.error(messageConstants.ALLOCATION_REQUIRED, messageConstants.TOASTR_INVALID_HEADER);
            } else {
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
                                                          value={contractMemberService.getAutoCompleteValue(this.props.selectedContractMember.employee)}
                                                          loadOptions={contractMemberService.loadEmployees}
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