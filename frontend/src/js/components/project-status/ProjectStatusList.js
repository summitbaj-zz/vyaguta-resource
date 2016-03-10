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
    var ProjectStatus = require('./ProjectStatusRow');
    var ProjectStatusHeader = require('./ProjectStatusHeader');
    var crudActions = require('../../actions/crudActions');


    var ProjectStatusList = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.PROJECT_STATUS);
        },

        deleteProjectStatus: function (id) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.PROJECT_STATUS, id);
            }
        },

        renderProjectStatus: function (key) {
            return (
                <ProjectStatus key={key} index={key} projectStatus={this.props.projectStatus[key]}
                               deleteProjectStatus={this.deleteProjectStatus}/>
            );
        },

        render: function () {
            return (
                <div>
                    <ProjectStatusHeader header="Project Status" routes={this.props.routes}/>
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
                                    <th>Project Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(this.props.projectStatus).map(this.renderProjectStatus)}
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
            projectStatus: state.crudReducer.projectStatus
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectStatusList);
})();