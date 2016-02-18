/**
 * Created by pratishshr on 2/15/16.
 */


'use strict';

var React = require('react');
var ApiUtil = require('../../api-util/ApiUtil');
var History = require('react-router').History;
var BudgetHeader = require('./BudgetHeader');
var toastr = require('toastr');

var BudgetForm = React.createClass({
    mixins: [history],

    getInitialState: function () {
        return {
            budgetType: {}
        }
    },

    componentDidMount: function () {
        var budgetTypeId = this.props.params.budgetTypeId;

        var that = this;
        if (budgetTypeId) {
            ApiUtil.fetchById('budgetTypes', budgetTypeId, function (data) {
                that.setState({budgetType: data});
            })
        }
    },

    addBudgetType: function (event) {
        event.preventDefault();
        var that = this;

        var budgetTypeId = this.props.params.budgetTypeId;

        var budgetType = {
            title: this.refs.budgetType.value
        }

        if (budgetTypeId) {
            ApiUtil.edit('budgetTypes', budgetType, budgetTypeId, function (data) {
                toastr.success("Budget Type Successfully Edited");
                that.history.pushState(null, '/budgettypes');
            })
        } else {
            ApiUtil.create('budgetTypes', budgetType, function (data) {
                toastr.success("Budget Type Successfully Added");
                that.history.pushState(null, '/budgettypes');
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
                <BudgetHeader title="Add Budget Type"/>
                <div className="block">
                    <div className="block-title-border">Add Budget</div>
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
                                    className="fa fa-angle-right"></i>Save
                                </button>
                                <button className="btn btn-sm btn-default" type="reset"><i className="fa fa-repeat"></i>Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = BudgetForm;