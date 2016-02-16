/**
 * Created by pratishshr on 2/15/16.
 */

var React = require('react');
var Link = require('react-router').Link;
var Budget = require('./Budget');
var BudgetHeader = require('./BudgetHeader');
var ApiUtil = require('../../api-util/ApiUtil');
var _ = require('lodash');
var toastr = require('toastr');

var BudgetList = React.createClass({
    getInitialState: function () {
        return {
            budgetTypes: []
        }
    },

    componentDidMount: function () {
        var that = this;

        ApiUtil.fetchAll('budgetTypes', function (budgetTypes) {
            that.setState({budgetTypes: budgetTypes});
        })
    },

    deleteBudgetType: function (id) {
        var that = this;
        if (confirm("Are you sure?")) {
            ApiUtil.delete('budgetTypes', id, function (budgetId) {
                toastr.success("Budget Type Successfully Deleted");
                var index = _.indexOf(that.state.budgetTypes, _.find(that.state.budgetTypes, {id: budgetId}));
                that.state.budgetTypes.splice(index, 1);
                that.setState({budgetTypes: that.state.budgetTypes});
            });
        }
    },

    renderBudgetType: function (key) {
        return (
            <Budget key={key} index={key} budgetType={this.state.budgetTypes[key]}
                    deleteBudgetType={this.deleteBudgetType}/>
        )
    },


    render: function () {
        var budgetTypes = Object.keys(this.state.budgetTypes);
        return (
            <div>
                <BudgetHeader title="Budget Types"/>
                <div className="block full">
                    <div className="block-title">
                        <h2>Budget Details</h2>
                        <div className="block-options pull-right">
                            <Link to="budgettypes/add" title="Add Project" data-toggle="tooltip"
                                  className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                className="fa fa-plus"></i> Add Budget Type</Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-center table-hover table-striped">
                            <thead>
                            <tr>
                                <th>Budget Type</th>
                                <th className="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {budgetTypes.map(this.renderBudgetType)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = BudgetList;