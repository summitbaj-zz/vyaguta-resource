;(function () {
    'use-strict';

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
    var ProjectRole = require('./ProjectRoleRow');
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

    var ProjectRoleList = React.createClass({

        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET)
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_ROLES, {
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
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_ROLES, {
                _start: page,
                _limit: this.props.offset
            }, sortBy);
        },

        deleteProjectRole: function (id) {
            var that = this;

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstant.PROJECT_ROLES, id);
            });
        },

        renderProjectRole: function (key) {
            var startIndex = this.props.pagination.page + parseInt(key);
            return (
                <ProjectRole key={key} index={startIndex||1+parseInt(key)} projectRole={this.props.projectRoles[key]}
                             deleteProjectRole={this.deleteProjectRole}/>
            );
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
                this.props.actions.fetchByQuery(resourceConstant.PROJECT_ROLES, pagination, sortBy);
            } else {
                sortBy = '-' + field;
                this.props.actions.fetchByQuery(resourceConstant.PROJECT_ROLES, pagination, sortBy);
            }
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Project Roles" routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Role Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECT_ROLES.NEW} title="Add Project Role"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Role</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
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
                                {Object.keys(this.props.projectRoles).map(this.renderProjectRole)}
                                </tbody>
                            </table>
                        </div>
                        <Pagination maxPages={Math.ceil(this.props.pagination.count / this.props.offset)}
                                    refreshList={this.refreshList}/>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            projectRoles: state.crudReducer.projectRoles,
            pagination: state.crudReducer.pagination
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectRoleList);
})();