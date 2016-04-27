/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/1/16.
 */

;(function () {

    'use strict';

    //React and redux dependencies
    var React = require('react');

    //components
    var SelectOption = require('../../../SelectOption');

    //libraries
    var DatePicker = require('react-datepicker');
    var moment = require('moment');

    //util
    var alertBox = require('../../../../../util/alertBox');

    //constants
    var messageConstant = require('../../../../../constants/messageConstant');

    var Allocation = React.createClass({
        componentDidMount: function () {
            var contractAccordion = this.refs["collapse" + this.props.index];
            contractAccordion.click();
        },

        handleAllocationSelectOptionChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleAllocationSelectOptionChange(this.props.index, key, value);
        },

        handleAllocationInputChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleAllocationInputChange(this.props.index, key, value);
        },

        handleChangeJoinDate: function (date) {
            this.props.actions.handleAllocationInputChange(this.props.index, 'joinDate', date && date.format('YYYY-MM-DD'));
        },

        handleChangeEndDate: function (date) {
            this.props.actions.handleAllocationInputChange(this.props.index, 'endDate', date && date.format('YYYY-MM-DD'));
        },

        handleCheckBox: function (event) {
            var key = event.target.name;
            var value = event.target.checked;
            this.props.actions.handleAllocationInputChange(this.props.index, key, value);
        },

        renderProjectRoles: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.projectRoles[key].id}
                              option={this.props.projectRoles[key].title}/>
            )
        },

        deleteAllocation: function (event) {
            event.preventDefault();

            var that = this;

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteAllocation(that.props.index);
            });
        },

        render: function () {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading clearfix" role="tab" id={"heading" + this.props.index}>
                        <h4 className="panel-title"><a role="button" data-toggle="collapse"
                                                                  ref={"collapse" + this.props.index}
                                                                  data-parent="#accordion"
                                                                  href={"#collapse" + this.props.index}
                                                                  aria-expanded="false"
                                                                  aria-controls={"collapse" + this.props.index}>
                            Allocation {parseInt(this.props.index) + 1}</a>
                            { this.props.totalAllocations > 1 &&
                            <span href="#" onClick={this.deleteAllocation} className="pull-right"><i
                                className="delete-btn fa fa-close"></i></span>
                            }
                        </h4>

                    </div>
                    <div id={"collapse" + this.props.index} className="panel-collapse collapse" role="tabpanel"
                         aria-labelledby={"heading"+ this.props.index}>
                        <div className="panel-body no-padding">
                            <div className="form-group">
                                <label className="control-label col-md-4">Role</label>
                                <div className="col-md-8">
                                    <select ref="role"
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            value={this.props.allocation.role &&
                                                    this.props.allocation.role.id}
                                            onChange={this.handleAllocationSelectOptionChange}>
                                        <option value="0">Please select</option>
                                        {Object.keys(this.props.projectRoles).map(this.renderProjectRoles)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-4">Estimated
                                    Duration *</label>
                                <div className="col-md-8">
                                    <div className="input-group input-daterange">
                                        <DatePicker
                                            selected={this.props.allocation.joinDate && moment(this.props.allocation.joinDate)}
                                            className="form-control"
                                            placeholderText="From"
                                            popoverTargetOffset='40px 0px'
                                            onChange={this.handleChangeJoinDate}/>
                                                                <span className="input-group-addon"><i
                                                                    className="fa fa-angle-right"></i></span>
                                        <DatePicker
                                            selected={this.props.allocation.endDate && moment(this.props.allocation.endDate)}
                                            className="form-control"
                                            placeholderText="To"
                                            minDate={this.props.allocation.joinDate && moment(this.props.allocation.joinDate)}
                                            popoverTargetOffset='40px 0px'
                                            onChange={this.handleChangeEndDate}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-4">Allocation</label>
                                <div className="col-md-8">
                                    <div className="input-group">
                                        <select  className="form-control"
                                                 name="allocation" ref="allocation"
                                                 id="allocation"
                                                 value={this.props.allocation && this.props.allocation.allocation}
                                                 onChange={this.handleAllocationInputChange}>
                                            <option value="0">0</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="75">75</option>
                                            <option value="100">100</option>
                                        </select>
                                         <span className="input-group-addon"><i
                                             className="fa fa-percent"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-md-4">Billed</label>
                                <div className="col-md-8">
                                    <label htmlFor={"billed-resource" + this.props.index}
                                           className="billed-resource switch switch-default">
                                        <input type="checkbox" name="billed"
                                               id={'billed-resource' + this.props.index}
                                               checked={this.props.allocation.billed}
                                               onChange={this.handleCheckBox}
                                        />
                                        <span data-toggle="tooltip"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    module.exports = Allocation;
})
();