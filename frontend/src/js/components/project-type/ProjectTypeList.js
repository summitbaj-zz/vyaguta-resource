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
    var ProjectType = require('./ProjectTypeRow');
    var ProjectTypeHeader = require('./ProjectTypeHeader');
    var crudActions = require('../../actions/crudActions');


    var ProjectTypeList = React.createClass({

        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.PROJECT_TYPES);
        },

        deleteProjectType: function (id) {
            if (confirm('Are you sure?')) {
                this.props.actions.deleteItem(resourceConstant.PROJECT_TYPES, id);
            }
        },

        renderProjectType: function (key) {
            return (
                <ProjectType key={key} index={key} projectType={this.props.projectTypes[key]}
                             deleteProjectType={this.deleteProjectType}/>
            );
        },

        render: function () {
            return (
                <div>
                    <ProjectTypeHeader header="Project Types" routes={this.props.routes}/>
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
                                {Object.keys(this.props.projectTypes).map(this.renderProjectType)}
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
            projectTypes: state.crudReducer.projectTypes
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectTypeList);
})();