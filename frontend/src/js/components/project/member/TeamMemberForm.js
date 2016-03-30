/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/29/16.
 */

;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //libraries
    var DatePicker = require('react-datepicker');
    var moment = require('moment');

    //constants
    var resourceConstant = require('../../../constants/resourceConstant');

    //components
    var TeamMemberAddButtons = require('./TeamMemberAddButtons');
    var TeamMemberEditButtons = require('./TeamMemberEditButtons');
    var apiUtil = require('../../../util/apiUtil');

    var TeamMemberForm = React.createClass({
        getInitialState: function () {
            return {
                joinDate: moment(),
                endDate: moment(),
                isChecked: false,
                member: {},
                employees: []
            };
        },

        componentDidMount: function () {
            var that = this;
            apiUtil.fetchAllFromCore(resourceConstant.EMPLOYEES, function (data) {
                that.setState({employees: data || []});
            })
        },

        handleInputChange: function (event) {
            if (this.props.memberIndexInModal) {
                var name = event.target.name;
                var value = event.target.value;

                this.state.member[name] = value;
                this.setState({member: this.state.member});
            }
        },

        //for DatePicker
        handleChangeStartDate: function (date) {
            if (this.props.memberIndexInModal) {
                this.state.member.joinDate = date;
            }
            this.setState({
                joinDate: date
            });
        },

        //for DatePicker
        handleChangeEndDate: function (date) {
            if (this.props.memberIndexInModal) {
                this.state.member.endDate = date;
            }
            this.setState({
                endDate: date
            })
        },

        toggleCheckBox: function () {
            if (this.props.memberIndexInModal) {
                this.state.member.billed = !this.state.member.billed;
            }
            this.setState({isChecked: !this.state.isChecked});
        },

        //called when member form is submitted
        addMember: function () {
            var member = {
                employee: {"id": this.refs.employee.value},
                memberRole: this.refs.role.value,
                joinDate: this.state.joinDate,
                endDate: this.state.endDate,
                allocation: this.refs.allocation.value,
                billed: this.state.isChecked,
                active: true
            };

            if (this.props.memberIndexInModal) {
                this.props.actions.editTeamMember(this.props.memberIndexInModal, member);
            } else {
                this.props.actions.addTeamMember(member);
            }

            document.querySelector('#close-btn').click();
        },

        removeMember: function () {
            this.props.actions.deleteTeamMember(this.props.memberIndexInModal);
            this.props.actions.clearMemberIndex();
            document.querySelector('#close-btn').click();
        },

        //set value of Select Dropdown on Edit
        setSelectOption: function (value) {
            $("#role").val(value).selected = true;
        },

        //set value of Select Dropdown on Edit
        setEmployee: function (value) {
            $("#employee").val(value).selected = true;
        },

        renderEmployee: function (key) {
            return (
                <option key={key} index={key}
                        value={this.state.employees[key].id}>{this.state.employees[key].firstName}</option>
            )
        },

        render: function () {
            //initialize everytime modal opens
            this.state.member = {};

            var buttons;

            if (this.props.memberIndexInModal) {
                this.state.member = this.props.teamMembers[this.props.memberIndexInModal];
                this.state.isChecked = this.state.member.billed;
                this.state.joinDate = this.state.member.joinDate;
                this.state.endDate = this.state.member.endDate;

                this.setSelectOption(this.state.member.memberRole);
                this.setEmployee(this.state.member.employee.id);

                buttons = <TeamMemberEditButtons addMember={this.addMember} removeMember={this.removeMember}/>;
            } else {
                buttons = <TeamMemberAddButtons addMember={this.addMember}/>;
            }

            return (
                <div className="modal fade" id={"addTeam" + this.props.index} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <div className="modal-title">Contract {this.props.index} Team Members</div>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal" id="team-member-form">
                                    <div className="form-group">
                                        <label className="control-label col-md-4">Team Member</label>
                                        <div className="col-md-8">
                                            <select ref="employee" id="employee" name="employee"
                                                    className="form-control">
                                                <option value="0">Please select</option>
                                                {Object.keys(this.state.employees).map(this.renderEmployee)}
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
                                                                <DatePicker selected={this.state.joinDate}
                                                                            onChange={this.handleChangeStartDate}
                                                                            className="form-control"
                                                                            placeholderText="From"
                                                                            popoverTargetOffset='40px 0px'/>
                                                                <span className="input-group-addon"><i
                                                                    className="fa fa-angle-right"></i></span>
                                                                <DatePicker selected={this.state.endDate}
                                                                            onChange={this.handleChangeEndDate}
                                                                            minDate={this.state.joinDate}
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
                                                                       value={this.state.member.allocation}
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
                                                                       onChange={this.toggleCheckBox}
                                                                       id="billed-resource"
                                                                       checked={this.state.isChecked}/>
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
                                </form>
                            </div>
                            {buttons}
                        </div>
                    </div>
                </div>

            )
        }
    });

    module.exports = TeamMemberForm;
})();
