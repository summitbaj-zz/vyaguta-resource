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
    var messageConstant = require('../../constants/messageConstant');

    //components
    var BudgetTypeRow = require('./BudgetTypeRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var Pagination = require('../common/pagination/Pagination');
    var alertBox = require('../../util/alertBox');
    var sortUI = require('../../util/sortUI');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');

    var sortBy = '';

    var BudgetTypeList = React.createClass({
        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET)
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, {
                _start: this.props.pagination.page || 1,
                _limit: this.props.offset
            });
        },

        componentWillReceiveProps: function (nextProps) {
            if (this.props.pagination.page > 1 && !nextProps.budgetTypes.length) {
                this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, {
                    _start: 1,
                    _limit: this.props.offset
                }, sortBy);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
            this.props.actions.apiClearState();
        },

        refreshList: function (index) {
            var page = 1 + (index - 1) * this.props.offset;
            this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, {
                _start: page,
                _limit: this.props.offset
            }, sortBy);
        },

        deleteBudgetType: function (id) {
            var that = this;
            var pagination = {
                _start: this.props.pagination.page || 1,
                _limit: this.props.offset
            };

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstant.BUDGET_TYPES, id, pagination, sortBy)
            });
        },

        renderBudgetType: function (key) {
            var startIndex = this.props.pagination.page + parseInt(key);
            return (
                <BudgetTypeRow key={key} index={startIndex||1+parseInt(key)} budgetType={this.props.budgetTypes[key]}
                               deleteBudgetType={this.deleteBudgetType}/>
            )
        },

        //sorts data in ascending or descending order according to clicked field
        sort: function (field) {
            var isAscending = sortUI.changeSortDisplay(field);
            var pagination = {
                _start: this.props.pagination.page,
                _limit: this.props.offset
            };

            if (isAscending) {
                sortBy = field;
                this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, pagination, sortBy);
            } else {
                sortBy = '-' + field;
                this.props.actions.fetchByQuery(resourceConstant.BUDGET_TYPES, pagination, sortBy);
            }
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Budget Types" routes={this.props.routes} title="Budget Types"/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Budget Type Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.BUDGET_TYPES.NEW} title="Add Budget Type"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Budget Type</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th className="cursor-pointer sort noselect col-500" data-sort="none" id="title"
                                        onClick={this.sort.bind(null, 'title')}>
                                        Budget Type
                                        <i className="fa fa-sort pull-right"></i>
                                    </th>
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
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetTypeList);

})();
