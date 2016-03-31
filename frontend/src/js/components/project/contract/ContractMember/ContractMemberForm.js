/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/31/16.
 */

;(function () {

    //React and redux dependencies
    var React = require('react');

    //libraries
    var DatePicker = require('react-datepicker');

    var ContractMemberForm = React.createClass({
        componentDidMount: function () {
            var that = this;
            $('#addContractMember').modal('show');
            $('#addContractMember').on('hidden.bs.modal', function(event) {
                that.props.toggleModalState(event);
            })
        },

        saveContractMember: function() {
            var data = {};
            this.props.actions.addContractMember(this.props.contractIndex, data);
            $('#addContractMember').modal('hide');
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
                                            <select ref="employee" id="employee" name="employee"
                                                    className="form-control">
                                                <option value="0">Please select</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="panel-group custom-accordion" id="accordion" role="tablist"
                                         aria-multiselectable="true">
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="headingOne">
                                                <h4 className="panel-title"><a role="button" data-toggle="collapse"
                                                                               data-parent="#accordion"
                                                                               href="#collapseOne"
                                                                               aria-expanded="true"
                                                                               aria-controls="collapseOne">
                                                    Allocation </a>
                                                </h4>
                                            </div>
                                            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel"
                                                 aria-labelledby="headingOne">
                                                <div className="panel-body">
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Role</label>
                                                        <div className="col-md-8">
                                                            <select ref="role" id="role" name="role"
                                                                    className="form-control">
                                                                <option value="0">Please select</option>
                                                                <option value="1">Developer</option>
                                                                <option value="2">Tester</option>
                                                                <option value="3">Team Lead</option>
                                                                <option value="4">SA</option>
                                                                <option value="5">PM</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Estimated
                                                            Duration</label>
                                                        <div className="col-md-8">
                                                            <div className="input-group input-daterange">
                                                                <DatePicker
                                                                            className="form-control"
                                                                            placeholderText="From"
                                                                            popoverTargetOffset='40px 0px'/>
                                                                <span className="input-group-addon"><i
                                                                    className="fa fa-angle-right"></i></span>
                                                                <DatePicker
                                                                            className="form-control"
                                                                            placeholderText="To"
                                                                            popoverTargetOffset='40px 0px'/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Allocation</label>
                                                        <div className="col-md-8">
                                                            <div className="input-group">
                                                                <input ref="allocation" name="allocation" type="text"
                                                                       placeholder="0"
                                                                       className="form-control"
                                                                       onChange={this.handleInputChange}/>
                                                <span className="input-group-addon"><i
                                                    className="fa fa-percent"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Billed</label>
                                                        <div className="col-md-8">
                                                            <label htmlFor="billed-resource"
                                                                   className="billed-resource switch switch-default">
                                                                <input type="checkbox" name="billed"
                                                                       id="billed-resource"
                                                                       />
                                                                <span data-toggle="tooltip"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-block padding-v-10"><a className="btn btn-xs btn-default"
                                                                                   href=""><i
                                            className="fa fa-plus icon-space"></i>Add Another Allocation</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-ghost" id="close-btn"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button"
                                        className="btn btn-sm btn-success"
                                        onClick={this.saveContractMember}>
                                    <i
                                        className="fa fa-plus"></i>Add
                                    Team Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    module.exports = ContractMemberForm;
})();