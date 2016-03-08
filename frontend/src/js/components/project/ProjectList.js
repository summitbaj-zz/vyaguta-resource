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

    var ProjectList = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.PROJECTS);
        },

        deleteProject: function (key) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.PROJECTS, id);
            }
        },

        renderProject: function (key) {
            return (
                <Project key={key} index={key} project={this.props.projects[key]}
                         deleteProject={this.deleteProject}/>
            );
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
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            projects: state.crudReducer.projects
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectList);

})();