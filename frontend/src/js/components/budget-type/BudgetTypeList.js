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
    var resourceConstants = require('../../constants/resourceConstants');
    var urlConstants = require('../../constants/urlConstants');
    var messageConstants = require('../../constants/messageConstants');

    //components
    var BudgetTypeRow = require('./BudgetTypeRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var Pagination = require('../common/pagination/Pagination');

    //utils
    var alertBox = require('../../utils/alertBox');

    //services
    var listService = require('../../services/listService');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');

    var sortBy = '';

    var BudgetTypeList = React.createClass({
        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstants.OFFSET)
            }
        },

        componentWillMount: function () {
            this.fetchData(this.props.pagination.startPage);
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
            this.props.actions.clearList(resourceConstants.BUDGET_TYPES);
            this.props.actions.apiClearState();
        },

        fetchData: function (start) {
            this.props.actions.fetch(resourceConstants.BUDGET_TYPES, resourceConstants.BUDGET_TYPES, {
                sort: sortBy,
                start: start || 1,
                offset: this.props.offset
            });
        },

        refreshList: function (index) {
            var start = 1 + (index - 1) * this.props.offset;
            this.fetchData(start);
        },

        deleteBudgetType: function (id) {
            var that = this;

            alertBox.confirm(messageConstants.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstants.BUDGET_TYPES, id, {
                    sort: sortBy,
                    start: that.props.pagination.startPage || 1,
                    offset: that.props.offset
                }, that.props.pagination.count);
            });
        },

        //sorts data in ascending or descending order according to clicked field
        sort: function (field) {
            var isAscending = listService.changeSortDisplay(field);
            sortBy = (isAscending) ? field : '-' + field;
            this.fetchData(this.props.pagination.startPage);
        },

        renderBudgetType: function (key) {
            var startIndex = this.props.pagination.startPage + parseInt(key);
            return (
                <BudgetTypeRow key={key} index={startIndex || 1 + parseInt(key)}
                               budgetType={this.props.budgetTypes[key]}
                               deleteBudgetType={this.deleteBudgetType}/>
            )
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Budget Types" routes={this.props.routes} title="Budget Types"
                                  apiState={this.props.apiState}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Budget Type Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstants.BUDGET_TYPES.NEW} title="Add Budget Type"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Budget Type</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-bordered table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th className="cursor-pointer sort noselect col-400" data-sort="none" id="title"
                                        onClick={this.sort.bind(null, 'title')}>
                                        Budget Type
                                        <i className="fa fa-sort pull-right"></i>
                                    </th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.budgetTypes.length ? Object.keys(this.props.budgetTypes).map(this.renderBudgetType) : listService.displayNoRecordFound()}
                                </tbody>
                            </table>
                        </div>
                        <Pagination maxPages={Math.ceil(this.props.pagination.count / this.props.offset)}
                                    selectedPage={parseInt(this.props.pagination.startPage / 10) + 1}
                                    refreshList={this.refreshList}/>

                    </div>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            budgetTypes: state.crudReducer.budgetTypes,
            pagination: state.crudReducer.pagination,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetTypeList);

})();
