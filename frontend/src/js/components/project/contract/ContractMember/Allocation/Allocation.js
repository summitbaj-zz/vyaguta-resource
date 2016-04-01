/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/1/16.
 */

;(function () {

    'use strict';

    //React and redux dependencies
    var React = require('react');

    //libraries
    var DatePicker = require('react-datepicker');

    var Allocation = React.createClass({
        componentDidMount: function() {
            var contractAccordion = this.refs["collapse" + this.props.index];
            contractAccordion.click();
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
            )
        }
    });

    module.exports = Allocation;
})();