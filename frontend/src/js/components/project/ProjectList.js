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
    var Project = require('./ProjectRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var Pagination = require('../common/pagination/Pagination');
    var alertBox = require('../../util/alertBox');
    var sortUI = require('../../util/sortUI');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //libraries
    var _ = require('lodash');

    //util
    var ApiUtil = require('../../util/apiUtil');
    var sortBy = '';

    var ProjectList = React.createClass({
        getDefaultProps: function () {
            return {
                offset: parseInt(resourceConstant.OFFSET),
                startIndex: parseInt(resourceConstant.START_INDEX)
            }
        },
        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.PROJECTS, {
                _start: this.props.startIndex,
                _limit: this.props.offset
            });
        },

        componentWillUnmount: function () {
            this.props.actions.clearPagination();
            this.props.actions.apiClearState();
        },

        deleteProject: function (key) {
            var that = this;

            alertBox.confirm(messageConstant.DELETE_MESSAGE, function () {
                that.props.actions.deleteItem(resourceConstant.PROJECTS, id);
            });
        },

        renderProject: function (key) {
            var startIndex = this.props.pagination.page + parseInt(key);

            return (
                <Project key={key} index={startIndex||1+parseInt(key)} project={this.props.projects[key]}
                         deleteProject={this.deleteProject}/>
            );
        },

        refreshList: function (index) {
            var startIndex = 1 + (index - 1) * this.props.offset;
            this.props.actions.fetchByQuery(resourceConstant.PROJECTS, {_start: startIndex, _limit: this.props.offset}, sortBy);
        },

        //sorts data in ascending or descending order according to clicked field
        sort: function (field, event) {
            var sortByAscending = sortUI.changeSortDisplay(event);
            sortBy = field;

            var pagination = {
                _start: this.props.startIndex,
                _limit: this.props.offset
            };

            if (sortByAscending) {
                this.props.actions.fetchByQuery(resourceConstant.PROJECTS, pagination, field);
            } else {
                this.props.actions.fetchByQuery(resourceConstant.PROJECTS, pagination, '-' + field);
            }
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Projects" routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECTS.NEW} title="Add Project"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Projects<i className="fa fa-sort cursor-pointer pull-right"
                                                   data-sort="none"
                                                   onClick={this.sort.bind(null, 'title')}></i></th>
                                    <th>Project Type<i className="fa fa-sort cursor-pointer pull-right"
                                                       data-sort="none"
                                                       onClick={this.sort.bind(null, 'projectType')}></i></th>
                                    <th>Budget Type<i className="fa fa-sort cursor-pointer pull-right"
                                                      data-sort="none"
                                                      onClick={this.sort.bind(null, 'budgetType')}></i></th>
                                    <th>Start Date<i className="fa fa-sort cursor-pointer pull-right"
                                                     data-sort="none"
                                                     onClick={this.sort.bind(null, 'startDate')}></i></th>
                                    <th>End Date<i className="fa fa-sort cursor-pointer pull-right"
                                                   data-sort="none"
                                                   onClick={this.sort.bind(null, 'endDate')}></i></th>
                                    <th>Project Status<i className="fa fa-sort cursor-pointer pull-right"
                                                         data-sort="none"
                                                         onClick={this.sort.bind(null, 'projectStatus')}></i></th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projects).map(this.renderProject)}
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
            projects: state.crudReducer.projects,
            pagination: state.crudReducer.pagination
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectList);

})();