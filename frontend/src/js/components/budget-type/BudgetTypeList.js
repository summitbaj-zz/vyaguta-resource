/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var Link = require('react-router').Link;
    var connect = require('react-redux').connect;
    var crudActions = require('../../actions/crudActions');
        var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //libraries
    var _ = require('lodash');

    //components
    var BudgetTypeRow = require('./BudgetTypeRow');
    var BudgetTypeHeader = require('./BudgetTypeHeader');


    var BudgetTypeList = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.BUDGET_TYPES);
        },

        deleteBudgetType: function (id) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.BUDGET_TYPES, id);
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
                                <Link to={urlConstant.BUDGET_TYPES.NEW} title="Add Budget Type" data-toggle="tooltip"
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

    var mapStateToProps = function (state) {
        return {
            budgetTypes: state.crudReducer.budgetTypes
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetTypeList);

})();
