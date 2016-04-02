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

    var ContractMemberForm = React.createClass({
        componentDidMount: function () {
            var that = this;

            $('#addContractMember').modal('show');
            $('#addContractMember').on('hidden.bs.modal', function (event) {
                that.props.toggleModalState(event);
            })
        },

        saveContractMember: function () {
            var data = {
                employee: {id: this.refs.employee.value},
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

        handleContractMemberSelectOptionChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleContractMemberSelectOptionChange(key, value);
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
                                            <select ref="employee"
                                                    id="employee"
                                                    name="employee"
                                                    className="form-control"
                                                    value={this.props.selectedContractMember.employee
                                                           && this.props.selectedContractMember.employee.id}
                                                    onChange={this.handleContractMemberSelectOptionChange}>
                                                <option value="0">Please select</option>
                                                <option value="1">Pratish Shrestha</option>
                                                <option value="2">Bishal Shrestha</option>
                                            </select>
                                        </div>
                                    </div>

                                    <AllocationContainer allocations={this.props.selectedContractMember.allocations}
                                                         actions={this.props.actions}
                                                         projectRoles={this.props.projectRoles}
                                                         memberIndex={this.props.memberIndex}/>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-ghost" id="close-btn"
                                        data-dismiss="modal">Close
                                </button>
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
                                    <i className="fa fa-plus"></i>
                                    Update
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