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
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var BudgetTypeRow = require('./BudgetTypeRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var crudActions = require('../../actions/crudActions');
    var Pagination = require('../common/pagination/Pagination');
    var alertBox = require('../../util/alertBox');

    var BudgetTypeList = React.createClass({
        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET),
                startIndex: parseInt(resourceConstant.START_INDEX)
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, {
                _start: this.props.startIndex,
                _limit: this.props.offset
            });
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
        },

        refreshList: function (index) {
            var startIndex = 1 + (index - 1) * this.props.offset;
            this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, {
                _start: startIndex,
                _limit: this.props.offset
            });
        },

        deleteBudgetType: function (id) {
            var that = this;

            alertBox.confirm('Are you sure you want to delete this item?', function () {
                that.props.actions.deleteItem(resourceConstant.BUDGET_TYPES, id)
            });
        },

        renderBudgetType: function (key) {
            var startIndex = this.props.pagination.page + parseInt(key);
            return (
                <BudgetTypeRow key={key} index={startIndex} budgetType={this.props.budgetTypes[key]}
                               deleteBudgetType={this.deleteBudgetType}/>
            )
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Budget Types" routes={this.props.routes}/>
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
                        <Pagination maxPages={Math.ceil(this.props.pagination.count / this.props.offset)}
                                    refreshList={this.refreshList}/>

                    </div>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            budgetTypes: state.crudReducer.budgetTypes,
            pagination: state.crudReducer.pagination
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetTypeList);

})();
