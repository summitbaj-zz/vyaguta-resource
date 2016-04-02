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

    var Allocation = React.createClass({
        componentDidMount: function() {
            var contractAccordion = this.refs["collapse" + this.props.index];
            if( !this.props.memberIndex) {
                contractAccordion.click();
            }
        },

        handleAllocationSelectOptionChange: function(event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleAllocationSelectOptionChange(this.props.index, key, value);
        },

        handleAllocationInputChange: function(event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.handleAllocationInputChange(this.props.index, key, value);
        },

        handleChangeJoinDate: function (date) {
            this.props.actions.handleAllocationInputChange(this.props.index, 'joinDate', date);
        },

        handleChangeEndDate: function (date) {
            this.props.actions.handleAllocationInputChange(this.props.index, 'endDate', date);
        },

        handleCheckBox: function(event) {
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

        render: function () {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id={"heading" + this.props.index}>
                        <h4 className="panel-title"><a role="button" data-toggle="collapse"
                                                       ref={"collapse" + this.props.index}
                                                       data-parent="#accordion"
                                                       href={"#collapse" + this.props.index}
                                                       aria-expanded="false"
                                                       aria-controls={"collapse" + this.props.index}>
                            Allocation </a>
                        </h4>
                    </div>
                    <div id={"collapse" + this.props.index} className="panel-collapse collapse" role="tabpanel"
                         aria-labelledby={"heading"+ this.props.index}>
                        <div className="panel-body">
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
                                    Duration</label>
                                <div className="col-md-8">
                                    <div className="input-group input-daterange">
                                        <DatePicker selected={this.props.allocation && this.props.allocation.joinDate}
                                            className="form-control"
                                            placeholderText="From"
                                            popoverTargetOffset='40px 0px'
                                            onChange={this.handleChangeJoinDate}/>
                                                                <span className="input-group-addon"><i
                                                                    className="fa fa-angle-right"></i></span>
                                        <DatePicker selected={this.props.allocation && this.props.allocation.endDate}
                                            className="form-control"
                                            placeholderText="To"
                                            popoverTargetOffset='40px 0px'
                                            onChange={this.handleChangeEndDate}/>
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
                                               onChange={this.handleAllocationInputChange}
                                                value={this.props.allocation && this.props.allocation.allocation}/>
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
})();