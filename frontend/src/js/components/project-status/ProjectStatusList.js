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
    var ProjectStatus = require('./ProjectStatusRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var Pagination = require('../common/pagination/Pagination');
    var alertBox = require('../../util/alertBox');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');

    var ProjectStatusList = React.createClass({

        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET),
                startIndex: parseInt(resourceConstant.START_INDEX)
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, {
                _start: this.props.startIndex,
                _limit: this.props.offset
            });
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
            this.props.actions.apiClearState();
        },

        refreshList: function (index) {
            var startIndex = 1 + (index - 1) * this.props.offset;
            this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, {
                _start: startIndex,
                _limit: this.props.offset
            });
        },

        deleteProjectStatus: function (id) {
            var that = this;

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstant.PROJECT_STATUS, id);
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

        sort: function (field, event) {
            var sortType = $(event.target).attr('data-sort');
            var pagination = {
                _start: this.props.startIndex,
                _limit: this.props.offset
            };

            if (sortType == 'none' || sortType == 'desc') {
                $(event.target).attr('data-sort', 'asc');
                $(event.target).attr('class', 'fa fa-sort-asc cursor-pointer pull-right');

                this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, pagination, field);
            } else if (sortType == 'asc') {
                $(event.target).attr('data-sort', 'desc');
                $(event.target).attr('class', 'fa fa-sort-desc cursor-pointer pull-right');

                this.props.actions.fetchByQuery(resourceConstant.PROJECT_STATUS, pagination, '-' + field);
            }
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Project Status"
                                  routes={this.props.routes}/>
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
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Project Status<i className="fa fa-sort cursor-pointer pull-right"
                                                         data-sort="none"
                                                         onClick={this.sort.bind(null, 'title')}></i></th>
                                    <th>Preview</th>
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
            pagination: state.crudReducer.pagination
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusList);
})();