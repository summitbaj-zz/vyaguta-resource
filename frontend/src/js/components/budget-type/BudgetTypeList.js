/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    var React = require('react');
    var Link = require('react-router').Link;
    var connect = require('react-redux').connect;

    var BudgetTypeRow = require('./BudgetTypeRow');
    var BudgetTypeHeader = require('./BudgetTypeHeader');
    var ApiUtil = require('../../util/ApiUtil');
    var crudActions = require('../../actions/crudActions');

    var _ = require('lodash');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var BudgetTypeList = React.createClass({
        componentDidMount: function () {
            crudActions.fetchAll(resourceConstant.BUDGET_TYPES);
        },

        updateState: function (budgetTypes) {
            this.setState({budgetTypes: budgetTypes});
        },

       deleteBudgetType: function (id) {
            var data = JSON.parse(JSON.stringify(this.props.budgetTypes));

            if (confirm('Are you sure?')) {
                crudActions.deleteItem(resourceConstant.BUDGET_TYPES, id, data);
            }
        },

        renderBudgetType: function (key) {
            return (
                <BudgetTypeRow key={key} index={key} budgetType={this.props.budgetTypes[key]}
                               deleteBudgetType={this.deleteBudgetType}/>
            )
        },

        render: function () {
            return (
                <div>
                    <BudgetTypeHeader title="Budget Types" routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Budget Type Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.BUDGET_TYPES.NEW} title="Add Project" data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Budget Type</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-center table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Budget Type</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.budgetTypes).map(this.renderBudgetType)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    });

    var selectStore = function (store) {
        return {
            budgetTypes: store.crudReducer.get(resourceConstant.BUDGET_TYPES)
        }
    }

    module.exports = connect(selectStore)(BudgetTypeList);

})();
