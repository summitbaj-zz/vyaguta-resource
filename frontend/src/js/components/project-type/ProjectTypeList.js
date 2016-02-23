;(function () {
    'use-strict';

    var React = require('react');
    var Link = require('react-router').Link;

    var connect = require('react-redux').connect;

    var ProjectType = require('./ProjectTypeRow');
    var ProjectTypeHeader = require('./ProjectTypeHeader');

    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var crudActions = require('../../actions/crudActions');
    var PAGE_TITLE = 'Project Types';

    var ProjectTypeList = React.createClass({

        componentDidMount: function () {
            crudActions.fetchAll(resourceConstant.PROJECT_TYPES);
        },

        list: function (key) {
            return (
                <ProjectType key={key} index={key} projectType={this.props.projectTypes[key]}
                               deleteProjectType={this.delete}/>
            );
        },

        delete: function (key) {
            var data = JSON.parse(JSON.stringify(this.props.projectTypes));
            if (confirm('Are you sure?')) {
                crudActions.deleteItem(resourceConstant.PROJECT_TYPES, key, data);
            }
        },

        render: function () {
            var projectTypeIds = Object.keys(this.props.projectTypes);
            return (
                <div>
                    <ProjectTypeHeader header={PAGE_TITLE} routes={this.props.routes}/>
                    <div className="block full">
                        <div className="block-title">
                            <h2>Project Type Details</h2>
                            <div className="block-options pull-right">
                                <Link to={urlConstant.PROJECT_TYPES.NEW} title="Add Project Type"
                                      data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Type</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Project Type</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {projectTypeIds.map(this.list)}
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
            projectTypes: store.crudReducer.get(resourceConstant.PROJECT_TYPES)
        }
    }

    module.exports = connect(storeSelector)(ProjectTypeList);

})();