;(function () {
    'use-strict';

    var React = require('react');
    var Link = require('react-router').Link;

    var store = require('../../store');
    var connect = require('react-redux').connect;

    var ProjectStatus = require('./ProjectStatusRow');
    var ProjectStatusHeader = require('./ProjectStatusHeader');

    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var crudActions = require('../../actions/crudActions');
    var PAGE_TITLE = 'Project Status';

    var ProjectStatusList = React.createClass({

        componentWillMount: function () {
            console.warn(this.props);
           crudActions.getAll(resourceConstant.PROJECT_STATUS);
        },

        list: function (key) {
            return (
                <ProjectStatus key={key} index={key} projectStatus={this.props.projectStatus[key]}
                               deleteProjectStatus={this.delete}/>
            );
        },

        delete: function (key) {
            var data = JSON.parse(JSON.stringify(this.props.projectStatus));
            if (confirm('Are you sure?')) {
                crudActions.deleteItem(resourceConstant.PROJECT_STATUS, key, data);
            }
        },

        render: function () {
            var projectStatusIds = Object.keys(this.props.projectStatus);
            return (
                <div>
                    <ProjectStatusHeader header={PAGE_TITLE} routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Status Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECT_STATUS.NEW} title="Add Project Status"
                                      data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Status</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {projectStatusIds.map(this.list)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    });
    var storeSelector = function (store) {
        console.warn('bisha');
        return {
            projectStatus: store.crudReducer.get('projectStatus')
        }
    }

    module.exports = connect(storeSelector, ProjectStatusList.list)(ProjectStatusList);
})();