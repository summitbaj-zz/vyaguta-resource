/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/30/16.
 */

;(function () {
    'use strict';

    var React = require('react');

    //components
    var SelectOption = require('../SelectOption');
    var ContractMemberContainer = require('./ContractMember/ContractMemberContainer')

    //libraries
    var moment = require('moment');
    var DatePicker = require('react-datepicker');
    var moment = require('moment');

    var Contract = React.createClass({
        getInitialState: function () {
            return {
                startDate: moment(),
                endDate: moment()
            }
        },

        componentDidMount: function () {
            var contractAccordion = this.refs["collapseContract" + this.props.index];
            contractAccordion.click();
        },

        renderBudgetType: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.budgetTypes[key].id}
                              option={this.props.budgetTypes[key].title}/>
            )
        },

        handleChangeStartDate: function (date) {
            this.props.actions.handleContractChange(this.props.index, 'startDate', date.format('YYYY-MM-DD'));
        },

        handleChangeEndDate: function (date) {
            this.props.actions.handleContractChange(this.props.index, 'endDate', date.format('YYYY-MM-DD'));
        },

        handleChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleContractChange(this.props.index, key, value);
        },

        deleteContract: function() {

        },

        handleContractSelectOptionChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleContractSelectOptionChange(this.props.index, key, value);
        },

        render: function () {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id={"heading" + this.props.index}>
                        <h4 className="panel-title">
                            <a href={"#collapseContract" + this.props.index}
                               role="button"
                               ref={"collapseContract" + this.props.index}
                               data-toggle="collapse"
                               data-parent="#contractAccordion"
                               aria-expanded="false"
                               aria-controls={"collapseContract" + this.props.index}>
                                Contract {parseInt(this.props.index) + 1}
                            </a>

                        </h4>

                    </div>
                    <div id={"collapseContract" + this.props.index}
                         className="panel-collapse collapse"
                         role="tabpanel"
                         aria-labelledby={"heading" + this.props.index}>
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
                                                onChange={this.handleContractSelectOptionChange}>
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
                                            <DatePicker selected={this.props.contract.startDate && moment(this.props.contract.startDate)}
                                                        onChange={this.handleChangeStartDate}
                                                        className="form-control"
                                                        placeholderText="From"
                                                        popoverTargetOffset='40px 0px'
                                                        disabled={this.props.apiState.isRequesting}
                                            />
                                                    <span className="input-group-addon"><i
                                                        className="fa fa-angle-right"></i></span>
                                            <DatePicker selected={this.props.contract.endDate && moment(this.props.contract.endDate)}
                                                        onChange={this.handleChangeEndDate}
                                                        className="form-control"
                                                        minDate={this.props.contract.startDate && moment(this.props.contract.startDate) }
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

                            <ContractMemberContainer
                                contractIndex={this.props.index}
                                allocations={this.props.allocations}
                                contractMembers={this.props.contract && this.props.contract.contractMembers}
                                selectedContractMember={this.props.selectedContractMember}
                                actions={this.props.actions}
                                projectRoles={this.props.projectRoles}
                                employees={this.props.employees}/>
                        </div>
                    </div>
                </div>
            )
        }
    })

    module.exports = Contract;
})();
