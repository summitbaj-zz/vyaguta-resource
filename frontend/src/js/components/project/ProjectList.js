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

    //components
    var Project = require('./ProjectRow');
    var ProjectHeader = require('./ProjectHeader');
    var crudActions = require('../../actions/crudActions');
    var Pagination = require('../common/pagination/Pagination');

    //util
    var ApiUtil = require('../../util/ApiUtil');

    var ProjectList = React.createClass({
        getDefaultProps: function () {
            return {
                offset: 2,
                startIndex: 1,
                defaultProjectCount: 10,
                range: 4
            }
        },
        componentDidMount: function () {
            this.props.actions.fetchByQuery(resourceConstant.PROJECTS, {_start: this.props.startIndex, _limit: this.props.offset});

        },

        deleteProject: function (key) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.PROJECTS, id);
            }
        },

        renderProject: function (key) {
            var startIndex = 1+ parseInt(key) + (this.props.pageIndex -1)*this.props.offset;
            return (
                <Project key={key} index={startIndex} project={this.props.projects[key]}
                         deleteProject={this.deleteProject}/>
            );
        },

        refreshList: function (index) {
            this.props.actions.fetchByQuery(resourceConstant.PROJECTS, {_start: index, _limit: this.props.offset});
        },

        render: function () {
            return (
                <div>
                    <ProjectHeader title="Projects" routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Type Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECTS.NEW} title="Add Project"
                                      data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Projects</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Budget Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projects).map(this.renderProject)}
                                </tbody>
                            </table>
                        </div>
                        <Pagination maxPages={this.props.projects._count || this.props.defaultProjectCount / this.props.offset} refreshList={this.refreshList} range={this.props.range}/>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            projects: state.crudReducer.projects,
            pageIndex: state.crudReducer.pageIndex
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectList);

})();