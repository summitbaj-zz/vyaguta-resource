/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/25/16.
 */

;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var crudActions = require('../../actions/crudActions');
    var SwimLaneChart = require('../../util/charts/SwimLaneChart');

    var ProjectDetails = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchById(resourceConstant.PROJECTS, this.props.params.id);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader title="Project Details" routes={this.props.routes}/>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block full">
                                <div className="block-title">
                                    <h2>Project Details</h2>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-vcenter table-hover table-striped">
                                        <tbody>
                                        <tr>
                                            <th>Project Name</th>
                                            <td>{this.props.selectedItem.projects.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{this.props.selectedItem.projects.description}</td>
                                        </tr>
                                        <tr>
                                            <th>Start Date</th>
                                            <td>{this.props.selectedItem.projects.startDate}</td>
                                        </tr>
                                        <tr>
                                            <th>End Date</th>
                                            <td>{this.props.selectedItem.projects.endDate}</td>
                                        </tr>
                                        <tr>
                                            <th>Budget Type</th>
                                            <td>{this.props.selectedItem.projects.budgetType.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Project Type</th>
                                            <td>{this.props.selectedItem.projects.projectType.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Project Status</th>
                                            <td>{this.props.selectedItem.projects.projectStatus.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Account Manager</th>
                                            <td></td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <SwimLaneChart width="960"/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            selectedItem: state.crudReducer.selectedItem
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

})();