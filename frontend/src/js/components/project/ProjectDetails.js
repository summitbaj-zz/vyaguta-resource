/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/25/16.
 */

;(function () {
    'use-strict';
    var React = require('react');
    var ProjectHeader = require('./ProjectHeader');

    var ApiUtil = require('../../util/ApiUtil');

    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    var ProjectDetails = React.createClass({
        getInitialState: function () {
            return {
                project: {
                    budgetType:{},
                    projectType:{},
                    projectStatus:{},
                    accountManager:{}
                }
            }
        },
        componentDidMount: function () {
            ApiUtil.fetchById(resourceConstant.PROJECTS, this.props.params.id, this.updateState);
        },
        updateState: function(project){
            this.setState({project: project});
        },
        render: function () {
            return (
                <div>
                    <ProjectHeader title="Project Details" routes={this.props.routes}/>

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
                                            <td>{this.state.project.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{this.state.project.description}</td>
                                        </tr>
                                        <tr>
                                            <th>Start Date</th>
                                            <td>{this.state.project.startDate}</td>
                                        </tr>
                                        <tr>
                                            <th>End Date</th>
                                            <td>{this.state.project.endDate}</td>
                                        </tr>
                                        <tr>
                                            <th>Budget Type</th>
                                            <td>{this.state.project.budgetType.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Project Type</th>
                                            <td>{this.state.project.projectType.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Project Status</th>
                                            <td>{this.state.project.projectStatus.title}</td>
                                        </tr>
                                        <tr>
                                            <th>Account Manager</th>
                                            <td>{this.state.project.accountManager.firstName}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });


    module.exports = ProjectDetails;
})();