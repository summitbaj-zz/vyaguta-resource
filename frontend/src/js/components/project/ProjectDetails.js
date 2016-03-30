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
    var SwimLaneChart = require('../../util/charts/SwimLaneChart');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //libraries
    var _ = require('lodash');

    var ProjectDetails = React.createClass({
        componentDidMount: function () {
            this.props.actions.fetchById(resourceConstant.PROJECTS, this.props.params.id);
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECTS);
            this.props.actions.apiClearState();
        },

        unwantedFunction: function () {
            /*<div className="row">
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
             <td>{this.props.selectedItem.projects && this.props.selectedItem.projects.description}</td>
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
             <td>{this.props.selectedItem.projects.budgetType && this.props.selectedItem.projects.budgetType.title}</td>
             </tr>
             <tr>
             <th>Project Type</th>
             <td>{this.props.selectedItem.projects.projectType && this.props.selectedItem.projects.projectType.title}</td>
             </tr>
             <tr>
             <th>Project Status</th>
             <td>{this.props.selectedItem.projects.projectStatus && this.props.selectedItem.projects.projectStatus.title}</td>
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
             </div>*/
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header="Project Details" routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block clearfix">
                                <div className="block-title-border">Leapfrog Management System
                                    <div className="block-options">
                                        <div className="label-block pull-left"><span
                                            className="label label-green">In Progress</span> <span
                                            className="label label-lg-grey">Service</span> <span
                                            className="label label-lg-grey">Resource</span></div>
                                        <a className="btn btn-alt btn-sm btn-default" href="projectedit.html"><i
                                            className="fa fa-pencil"></i></a></div>
                                </div>
                                <div className="block-wrapper">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="common-view"><span
                                                className="view-label"> Project Description</span>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                                    ever since the 1500s, when an unknown printer took a galley of type
                                                    and scrambled </p>
                                            </div>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span className="view-label"> Client's Name</span>
                                                <p>Richan Shrestha</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span className="view-label"> Client's E-mail Address</span>
                                                <p>richanshrestha@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="common-view clearfix">
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span className="view-label">Account Manager</span>
                                                <p>John Doe</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span className="view-label"> Contract Date</span>
                                                <p>12/12/2015 <span>to </span> 12/12/2016</p>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-4"><span className="view-label"> Technology Stack</span>
                                                <p><span className="label label-blue">PHP</span><span
                                                    className="label label-blue">Angular JS</span></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-6">
                                            <div className="block full">
                                                <div className="block-title">
                                                    <h2>Team Members</h2>
                                                </div>
                                                <div className="block-content">
                                                    <ul className="team-list clearfix">
                                                        <li><a href="#" className="profile-img img-lg"><img
                                                            className="img-circle" alt="avatar"
                                                            src="img/placeholders/avatar.png"/></a></li>
                                                        <li><a href="#" className="profile-img img-lg"><img
                                                            className="img-circle" alt="avatar"
                                                            src="img/placeholders/avatar.png"/></a></li>
                                                        <li><a href="#" className="profile-img img-lg"><img
                                                            className="img-circle" alt="avatar"
                                                            src="img/placeholders/avatar.png"/></a></li>
                                                        <li><a href="#" className="profile-img img-lg"><img
                                                            className="img-circle" alt="avatar"
                                                            src="img/placeholders/avatar.png"/></a></li>
                                                        <li><a href="#" className="profile-img img-lg"><img
                                                            className="img-circle" alt="avatar"
                                                            src="img/placeholders/avatar.png"/></a></li>
                                                        <li><a href="#" className="profile-img img-lg add-team"
                                                               data-toggle="modal" data-target="#addTeam"><i
                                                            className="fa fa-plus"></i> <span
                                                            className="on-hover circular-block"></span> </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-lg-6">
                                            <div className="block full">
                                                <div className="block-title">
                                                    <h2>History</h2>
                                                </div>
                                                <div className="timeline block-content-full">
                                                    <ul className="timeline-list timeline-hover">
                                                        <li>
                                                            <div className="timeline-icon"><i
                                                                className="fa fa-pencil"></i>
                                                            </div>
                                                            <div className="timeline-time">8:00 am</div>
                                                            <div className="timeline-content">
                                                                <p className="push-bit"><strong>Team Member</strong></p>
                                                                <p className="push-bit">Anjali Shakya was added to this
                                                                    team</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-icon"><i
                                                                className="fa fa-file-text"></i>
                                                            </div>
                                                            <div className="timeline-time">9:15 am</div>
                                                            <div className="timeline-content">
                                                                <p className="push-bit"><strong>Web Design
                                                                    Session</strong>
                                                                </p>
                                                                A1 Conference Room
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-icon"><i
                                                                className="fa fa-coffee"></i>
                                                            </div>
                                                            <div className="timeline-time">10:30 am</div>
                                                            <div className="timeline-content"><strong>Coffee
                                                                Break</strong>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-icon"><i
                                                                className="fa fa-coffee"></i>
                                                            </div>
                                                            <div className="timeline-time">10:30 am</div>
                                                            <div className="timeline-content"><strong>Coffee
                                                                Break</strong>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="timeline-icon"><i
                                                                className="fa fa-pencil"></i>
                                                            </div>
                                                            <div className="timeline-time">8:00 am</div>
                                                            <div className="timeline-content">
                                                                <p className="push-bit"><strong>Team Member</strong></p>
                                                                <p className="push-bit">An awesome breakfast will wait
                                                                    for
                                                                    you at the lobby!</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-sm-12">
                                            <div className="block full">
                                                <div className="block-title">
                                                    <h2>Timeline</h2>
                                                </div>
                                                <div className="block-content">
                                                    Timeline Content
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

})();