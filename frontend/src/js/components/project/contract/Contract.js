/**
* Created by
* Pratish Shrestha <pratishshrestha@lftechnology.com>
* on 3/30/16.
*/

;(function() {
    'use strict';

    var React = require('react');

    //components
    var SelectOption = require('../SelectOption');
    var TeamMemberForm = require('../member/TeamMemberForm');

    //libraries
    var moment = require('moment');
    var DatePicker = require('react-datepicker');

    var Contract = React.createClass({
        getInitialState: function () {
            return {
                startDate: moment(),
                endDate: moment()
            }
        },

        renderBudgetType: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.budgetTypes[key].id}
                    option={this.props.budgetTypes[key].title}/>
            )
        },

        handleChangeStartDate: function (date) {
            this.props.actions.handleContractChange(this.props.index, 'startDate', date);
        },

        handleChangeEndDate: function (date) {
            this.props.actions.handleContractChange(this.props.index, 'endDate', date);
        },

        handleChange: function(event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleContractChange(this.props.index, key, value);
        },

        render: function() {
            return(
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title"><a role="button" data-toggle="collapse"
                                data-parent="#accordion" href={"#collapseContract" + this.props.index}
                                aria-expanded="false"
                                aria-controls="collapseContract1"
                                className="collapsed">
                                Contract {this.props.index} </a></h4>
                        </div>
                        <div id={"collapseContract" + this.props.index} className="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingOne">
                            <div className="panel-body">


                                <div className="form-group clearfix">
                                    <div className="row multiple-element">

                                        <div className="col-md-6 col-lg-4 element">
                                            <label className=" control-label">Budget Type</label>
                                            <select className="form-control"
                                                ref="budgetType"
                                                name="budgetType"
                                                id="budgetType"
                                                value={this.props.contract &&
                                                    this.props.contract.budgetType &&
                                                    this.props.contract.budgetType.id}
                                                    onChange={this.handleChange}>
                                                    <option value="0">
                                                        Please Select
                                                    </option>

                                                    {Object.keys(this.props.budgetTypes).map(this.renderBudgetType)}

                                                </select>
                                                <span className="help-block"></span>
                                            </div>

                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Contract Date</label>
                                                <div data-date-format="mm/dd/yyyy"
                                                    className="input-group input-daterange">
                                                    <DatePicker selected={this.props.contract && this.props.contract.startDate}
                                                        onChange={this.handleChangeStartDate}
                                                        className="form-control"
                                                        placeholderText="From"
                                                        popoverTargetOffset='40px 0px'
                                                        disabled={this.props.apiState.isRequesting}
                                                        />
                                                    <span className="input-group-addon"><i
                                                        className="fa fa-angle-right"></i></span>
                                                    <DatePicker selected={this.props.contract && this.props.contract.endDate}
                                                        onChange={this.handleChangeEndDate}
                                                        className="form-control"
                                                        minDate={this.props.contract && this.props.contract.startDate}
                                                        placeholderText="To"
                                                        popoverTargetOffset='40px 0px'
                                                        disabled={this.props.apiState.isRequesting}
                                                        />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Contracted Resources</label>
                                        <textarea placeholder="No. of contracted resources"
                                            className="form-control"
                                            rows="4"
                                            name="resource"
                                            value={this.props.contract && this.props.contract.resource}
                                            onChange={this.handleChange}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">Team Members</label>
                                        <div className="row  text-center">
                                            <div className="col-sm-12">
                                                <div className="user-list-widget">
                                                    <ul className="user-list list-medium">
                                                        <li className="user-active"><a href="#"> <img alt="avatar"
                                                            src="img/placeholders/avatar-2.jpg"/>
                                                        <div className="user-info"><span>Billed</span> <span
                                                            className="status">Active</span></div>
                                                    </a></li>
                                                    <li className="user-active"><a href="#"> <img alt="avatar"
                                                        src="img/placeholders/avatar-2.jpg"/>
                                                    <div className="user-info"><span>Billed</span> <span
                                                        className="status">Active</span></div>
                                                </a></li>
                                                <li className="user-inactive"><img alt="avatar"
                                                    src="img/placeholders/avatar-2.jpg"/>
                                                <div className="user-info"><span>Billed</span> <span
                                                    className="status">Inactive</span></div>
                                            </li>
                                            <li><a href="#" className="add-team" data-toggle="modal"
                                                data-target={"#addTeam" + this.props.index}><i className="fa fa-plus"></i>
                                            <span className="on-hover"></span> </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TeamMemberForm key={this.props.index} index={this.props.index} actions={this.props.actions} teamMembers={this.props.teamMembers}
                memberIndexInModal={this.props.memberIndexInModal}/>
        </div>
    )
}
})

module.exports = Contract;
})();
