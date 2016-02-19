/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    var React = require('react');
    var ApiUtil = require('../../api-util/ApiUtil');
    var History = require('react-router').History;
    var BudgetTypeHeader = require('./BudgetTypeHeader');
    var toastr = require('toastr');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var BudgetTypeForm = React.createClass({
        mixins: [History],

        getInitialState: function () {
            return {
                budgetType: {}
            }
        },

        componentDidMount: function () {
            if (this.props.params.id) {
                ApiUtil.fetchById(resourceConstant.BUDGET_TYPES, this.props.params.id, this.updateState);
            }
        },

        updateState: function(budgetType) {
            this.setState({budgetType: budgetType});
        },

        addBudgetType: function (event) {
            event.preventDefault();
            var that = this;

            var budgetType = {
                title: this.refs.budgetType.value
            }

            if (this.props.params.id) {
                ApiUtil.edit(resourceConstant.BUDGET_TYPES, budgetType, this.props.params.id, function (data) {
                    toastr.success('Budget Type Successfully Edited');
                    that.history.pushState(null, urlConstant.BUDGET_TYPES.INDEX);
                })
            } else {
                ApiUtil.create(resourceConstant.BUDGET_TYPES, budgetType, function (data) {
                    toastr.success('Budget Type Successfully Added');
                    that.history.pushState(null, urlConstant.BUDGET_TYPES.INDEX);
                });
            }

        },

        handleChange: function (event) {
            var name = event.target.name;
            var value = event.target.value;

            this.state.budgetType[name] = value;
            this.setState({budgetType: this.state.budgetType});
        },

        render: function () {
            return (
                <div>
                    <BudgetTypeHeader title={(this.props.params.id)?'Edit Budget Type':'Add Budget Type'}/>
                    <div className="block">
                        <div
                            className="block-title-border">Budget Type Details
                        </div>
                        <form className="form-bordered" method="post" onSubmit={this.addBudgetType}>
                            <div className="form-group">
                                <label>Budget Type</label>
                                <input name="title" type="text" ref="budgetType" placeholder="Budget Type"
                                       className="form-control"
                                       value={this.state.budgetType.title} onChange={this.handleChange} required/>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success" type="submit"><i
                                        className="fa fa-angle-right"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                    </button>
                                    <button className="btn btn-sm btn-default" type="reset"><i
                                        className="fa fa-repeat"></i>Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    });

    module.exports = BudgetTypeForm;
})();