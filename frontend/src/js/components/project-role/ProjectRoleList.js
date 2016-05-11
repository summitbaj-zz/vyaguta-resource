;(function () {
    'use-strict';

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
    var ProjectRole = require('./ProjectRoleRow');
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

    var ProjectRoleList = React.createClass({
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
            this.props.actions.clearList(resourceConstants.PROJECT_ROLES);
            this.props.actions.apiClearState();
        },

        fetchData: function (start) {
            this.props.actions.fetch(resourceConstants.PROJECT_ROLES, resourceConstants.PROJECT_ROLES, {
                sort: sortBy,
                start: start || 1,
                offset: this.props.offset
            });
        },

        refreshList: function (index) {
            var start = 1 + (index - 1) * this.props.offset;
            this.fetchData(start);
        },

        deleteProjectRole: function (id) {
            var that = this;

            alertBox.confirm(messageConstants.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstants.PROJECT_ROLES,resourceConstants.PROJECT_ROLES, id, {
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

        renderProjectRole: function (key) {
            var startIndex = this.props.pagination.startPage + parseInt(key);
            return (
                <ProjectRole key={key} index={startIndex || 1 + parseInt(key)} projectRole={this.props.projectRoles[key]}
                             deleteProjectRole={this.deleteProjectRole}/>
            );
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Project Roles" routes={this.props.routes} title="Project Roles"
                                  apiState={this.props.apiState}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Role Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstants.PROJECT_ROLES.NEW} title="Add Project Role"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Role</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-bordered table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th className="cursor-pointer sort noselect col-500" data-sort="none" id="title"
                                        onClick={this.sort.bind(null, 'title')}>
                                        Project Role
                                        <i className="fa fa-sort pull-right"></i>
                                    </th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.projectRoles.length ? Object.keys(this.props.projectRoles).map(this.renderProjectRole) : listService.displayNoRecordFound()}
                                </tbody>
                            </table>
                        </div>
                        <Pagination maxPages={Math.ceil(this.props.pagination.count / this.props.offset)}
                                    selectedPage={parseInt(this.props.pagination.startPage / 10) + 1}
                                    refreshList={this.refreshList}/>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            projectRoles: state.crudReducer.projectRoles,
            pagination: state.crudReducer.pagination,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectRoleList);

})();