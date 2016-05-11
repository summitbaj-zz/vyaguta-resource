/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 5/9/16.
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
    var OperationalResourceRow = require('./OperationalResourceRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var Pagination = require('../common/pagination/Pagination');

    //utils
    var converter = require('../../utils/converter');
    var alertBox = require('../../utils/alertBox');
    
    //services
    var listService = require('../../services/listService');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');

    var sortBy = '';

    var OperationalResourceList = React.createClass({
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
            this.props.actions.clearList(resourceConstants.OPERATIONAL_RESOURCE);
            this.props.actions.apiClearState();
        },

        fetchData: function (start) {
            this.props.actions.fetch(resourceConstants.OPERATIONAL_RESOURCE, converter.getPathParam(resourceConstants.RESOURCE, resourceConstants.OPERATIONAL_RESOURCE), {
                sort: sortBy,
                start: start || 1,
                offset: this.props.offset
            });
        },

        refreshList: function (index) {
            var start = 1 + (index - 1) * this.props.offset;
            this.fetchData(start);
        },

        deleteOperationalResource: function (id) {
            var that = this;

            alertBox.confirm(messageConstants.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstants.OPERATIONAL_RESOURCE, converter.getPathParam(resourceConstants.RESOURCE, resourceConstants.OPERATIONAL_RESOURCE), id, {
                    sort: sortBy,
                    start: that.props.pagination.startPage || 1,
                    offset: that.props.offset
                }, that.props.pagination.count);
            });
        },

        //sorts data in ascending or descending  order according to clicked field
        sort: function (field) {
            var isAscending = listService.changeSortDisplay(field);
            sortBy = (isAscending) ? field : '-' + field;
            this.fetchData(this.props.pagination.startPage);
        },

        renderOperationalResource: function (key) {
            var startIndex = this.props.pagination.startPage + parseInt(key);

            
            return (
                <OperationalResourceRow key={key} index={startIndex || 1 + parseInt(key)}
                                        operationalResource={this.props.operationalResources[key]}
                                        deleteOperationalResource={this.deleteOperationalResource}/>
            )
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Operational Resource" routes={this.props.routes} title="Operational Resource"
                                  apiState={this.props.apiState}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Operational Resources Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstants.OPERATIONAL_RESOURCES.NEW} title="Add Operational Resource"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Operational Resource</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-bordered table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>
                                        Employee Name

                                    </th>
                                    <th>
                                        Designation

                                    </th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.operationalResources.length ? Object.keys(this.props.operationalResources).map(this.renderOperationalResource) : listService.displayNoRecordFound()}
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
            operationalResources: state.crudReducer.operational,
            pagination: state.crudReducer.pagination,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(OperationalResourceList);


})();