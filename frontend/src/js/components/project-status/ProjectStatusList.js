;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var Link = require('react-router').Link;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstants');
    var urlConstant = require('../../constants/urlConstants');
    var messageConstant = require('../../constants/messageConstants');

    //components
    var ProjectStatus = require('./ProjectStatusRow');
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

    var ProjectStatusList = React.createClass({
        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET)
            }
        },

        componentWillMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, {
                _start: this.props.pagination.page || 1,
                _limit: this.props.offset
            });
        },

        componentWillReceiveProps: function (nextProps) {
            if (this.props.pagination.page > 1 && !nextProps.projectStatus.length) {
                this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, {
                    _start: 1,
                    _limit: this.props.offset
                }, sortBy);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
            this.props.actions.clearList(resourceConstant.PROJECT_STATUS);
            this.props.actions.apiClearState();
        },

        refreshList: function (index) {
            var page = 1 + (index - 1) * this.props.offset;
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, {
                _start: page,
                _limit: this.props.offset
            }, sortBy);
        },

        deleteProjectStatus: function (id) {
            var that = this;
            var pagination = {
                _start: this.props.pagination.page || 1,
                _limit: this.props.offset
            };

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstant.PROJECT_STATUS, id, pagination, sortBy);
            });
        },

        renderProjectStatus: function (key) {
            var startIndex = this.props.pagination.page + parseInt(key);
            return (
                <ProjectStatus key={key} index={startIndex||1+parseInt(key)}
                               projectStatus={this.props.projectStatus[key]}
                               deleteProjectStatus={this.deleteProjectStatus}/>
            );
        },

        //sorts data in ascending or descending order according to clicked field
        sort: function (field) {
            var isAscending = sortUI.changeSortDisplay(field);
            var pagination = {
                _start: this.props.pagination.page,
                _limit: this.props.offset
            };

            sortBy = (isAscending) ? field : '-' + field;
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, pagination, sortBy);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Project Status"
                                  routes={this.props.routes} title="Project Status"
                                  apiState={this.props.apiState}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Status Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECT_STATUS.NEW} title="Add Project Status"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Status</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-bordered table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th className="cursor-pointer sort noselect col-250" data-sort="none" id="title"
                                        onClick={this.sort.bind(null, 'title')}>
                                        Project Status
                                        <i className="fa fa-sort pull-right"></i>
                                    </th>
                                    <th className="text-center col-250 ellipses">Preview</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projectStatus).map(this.renderProjectStatus)}
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
            projectStatus: state.crudReducer.projectStatus,
            pagination: state.crudReducer.pagination,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusList);
})();