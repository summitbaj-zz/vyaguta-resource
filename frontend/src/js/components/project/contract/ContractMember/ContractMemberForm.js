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

    //util
    var alertBox = require('../../../../util/alertBox');
    var apiUtil = require('../../../../util/apiUtil');

    //constants
    var messageConstant = require('../../../../constants/messageConstant');
    var resourceConstant = require('../../../../constants/resourceConstant');

    //libraries
    var Select = require('react-select');

    var ContractMemberForm = React.createClass({
        componentDidMount: function () {
            var that = this;

            $('#addContractMember').modal('show');
            $('#addContractMember').on('hidden.bs.modal', function (event) {
                that.props.toggleModalState(event);
            })
        },

        renderEmployees: function (key) {
            var employeeName = this.props.employees[key].firstName + ' ' + this.props.employees[key].middleName + ' ' + this.props.employees[key].lastName;
            return (
                <SelectOption key={key} index={key} id={this.props.employees[key].id}
                              option={employeeName}/>
            )
        },

        loadEmployees: function (input) {
            return apiUtil.fetchByQueryFromCore(resourceConstant.EMPLOYEES, input).then(function (response) {
                var options = [];
                for (var i = 0; i < response.body.data.length; i++) {
                    if (!response.body.data[i].middleName || response.body.data[i].middleName == 'NULL') {
                        var employeeName = response.body.data[i].firstName + ' ' + response.body.data[i].middleName + ' ' + response.body.data[i].lastName;
                    } else {
                        var employeeName = response.body.data[i].firstName + ' ' + response.body.data[i].lastName;
                    }
                    options.push({value: response.body.data[i].id, label: employeeName});
                }
                return {options: options};
            });
        },

        saveContractMember: function () {
            if (this.props.selectedContractMember.employee &&
                <this className="props selectedContractMember employee id"></this>) {
                var employee = {id: this.props.selectedContractMember.employee.id.value}
            } else {
                var employee = null;
            }

            var data = {
                employee: employee,
                allocations: this.props.selectedContractMember.allocations
            };

            if (this.props.memberIndex) {
                this.props.actions.updateContractMember(this.props.contractIndex, this.props.memberIndex, data);
            } else {
                this.props.actions.addContractMember(this.props.contractIndex, data);
            }
            $('#addContractMember').modal('hide');
        },

        componentWillUnmount: function () {
            this.props.setMemberIndex(null);
            this.props.actions.clearContractMember();
        },

        deleteContractMember: function () {
            var that = this;

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteContractMember(that.props.contractIndex, that.props.memberIndex);
                $('#addContractMember').modal('hide');
            });
        },

        handleAutoCompleteChange: function (value) {
            this.props.actions.handleContractMemberSelectOptionChange('employee', value);
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
                                        <label className="control-label col-md-4">Team Member</label>
                                        <div className="col-md-8">
                                            <Select.Async name="employee"
                                                          value={this.props.selectedContractMember.employee
                                                           && this.props.selectedContractMember.employee.id}
                                                          loadOptions={this.loadEmployees}
                                                          onChange={this.handleAutoCompleteChange}/>
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
            )
        }
    });

    module.exports = ContractMemberForm;
})();