/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */
;(function () {
    'use-strict';

    var React = require('react');
    var Link = require('react-router').Link;

    var connect = require('react-redux').connect;

    var Project = require('./ProjectRow');
    var ProjectHeader = require('./ProjectHeader');

    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var crudActions = require('../../actions/crudActions');
    var PAGE_TITLE = 'Project';

    var ProjectList = React.createClass({
        componentDidMount: function () {
            crudActions.fetchAll(resourceConstant.PROJECTS);
        },

        list: function (key) {
            return (
                <Project key={key} index={key} project={this.props.projects[key]}
                         deleteProject={this.delete}/>
            );
        },

        delete: function (key) {
            var data = JSON.parse(JSON.stringify(this.props.projects));
            if (confirm('Are you sure?')) {
                crudActions.deleteItem(resourceConstant.PROJECTS, key, data);
            }
        },

        render: function () {
            var projectIds = Object.keys(this.props.projects);
            return (
                <div>
                    <ProjectHeader title={PAGE_TITLE} routes={this.props.routes}/>
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
                                {projectIds.map(this.list)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    });
    var storeSelector = function (store) {
        return {
            projects: store.crudReducer.get(resourceConstant.PROJECTS)
        }
    }

    module.exports = connect(storeSelector)(ProjectList);
})();