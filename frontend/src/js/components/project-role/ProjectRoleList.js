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
    var ProjectRole = require('./ProjectRoleRow');
    var EntityHeader = require('../common/header/EntityHeader');
    var crudActions = require('../../actions/crudActions');


    var ProjectRoleList = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.PROJECT_ROLES);
        },

        deleteProjectRole: function (id) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.PROJECT_ROLES, id);
            }
        },

        renderProjectRole: function (key) {
            return (
                <ProjectRole key={key} index={key} projectRole={this.props.projectRoles[key]}
                             deleteProjectRole={this.deleteProjectRole}/>
            );
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
                                      data-toggle="tooltip"
                                      className="btn btn-sm btn-success btn-ghost text-uppercase"><i
                                    className="fa fa-plus"></i> Add Project Role</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-vcenter table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Project Role</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projectRoles).map(this.renderProjectRole)}
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
            projectRoles: state.crudReducer.projectRoles
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectRoleList);
})();