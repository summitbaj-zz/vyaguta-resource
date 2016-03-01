/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    var React = require('react');
    var ProjectHeader = require('./ProjectHeader');
    var ApiUtil = require('../../util/ApiUtil');
    var resourceConstant = require('../../constants/resourceConstant');
    var SelectOption = require('./SelectOption');

    var crudActions = require('../../actions/crudActions');
    var createProjectActions = require('../../actions/createProjectActions');
    var store = require('../../store/store');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //Team Member
    var TeamMemberForm = require('./member/TeamMemberForm');
    var TeamMember = require('./member/TeamMember');

    //datepicker
    var DatePicker = require('react-datepicker');
    var moment = require('moment');

    var ProjectForm = React.createClass({
        getInitialState: function () {
            return {
                startDate: moment(),
                endDate: moment()
            };
        },

        componentDidMount: function () {
            crudActions.fetchAll(resourceConstant.BUDGET_TYPES);
            crudActions.fetchAll(resourceConstant.PROJECT_STATUS);
            crudActions.fetchAll(resourceConstant.PROJECT_TYPES);
        },

        handleChangeStartDate: function (date) {
            this.setState({
                startDate: date
            });
        },

        handleChangeEndDate: function (date) {
            this.setState({
                endDate: date
            })
        },

        renderBudgetType: function (key) {
            return (
                <SelectOption key={key} index={key} entity={this.props.budgetTypes[key]}/>
            )
        },

        renderProjectType: function (key) {
            return (
                <SelectOption key={key} index={key} entity={this.props.projectTypes[key]}/>
            )
        },

        renderProjectStatus: function (key) {
            return (
                <SelectOption key={key} index={key} entity={this.props.projectStatus[key]}/>
            )
        },

        renderTeamMember: function (key) {
            return (
                <TeamMember key={key} index={key} actions={this.props.actions}/>
            )
        },

        clearMemberIndexInModal: function(){
            this.props.actions.clearMemberIndex();
            document.querySelector('#team-member-form').reset();
        },

        render: function () {
            return (
                <div>
                    <ProjectHeader title="Add Project" routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="block-title-border">Project Details</div>
                                <form className="form-bordered" method="post">
                                    <div className="form-group">
                                        <label>Project Name</label>
                                        <input type="text" placeholder="Project Name" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                    <textarea placeholder="Short description about the project."
                                              className="form-control" rows="4"></textarea>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Project Type</label>
                                                <select className="form-control">
                                                    <option value="">Please Select</option>
                                                    {Object.keys(this.props.projectTypes).map(this.renderProjectType)}
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className=" control-label">Budget Type</label>
                                                <select className="form-control">
                                                    <option value="">Please Select</option>
                                                    {Object.keys(this.props.budgetTypes).map(this.renderBudgetType)}
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Account Manager</label>
                                                <input type="text" placeholder="Account Manager Name"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label htmlFor="example-select" className="control-label">Project
                                                    Status</label>
                                                <select className="form-control">
                                                    <option value="">Please Select</option>
                                                    {Object.keys(this.props.projectStatus).map(this.renderProjectStatus)}
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Contract Date</label>
                                                <div data-date-format="mm/dd/yyyy"
                                                     className="input-group input-daterange">
                                                    <DatePicker selected={this.state.startDate}
                                                                onChange={this.handleChangeStartDate}
                                                                className="form-control" placeholderText="From"
                                                                popoverTargetOffset='40px 0px'/>
                                                <span className="input-group-addon"><i
                                                    className="fa fa-angle-right"></i></span>
                                                    <DatePicker selected={this.state.endDate}
                                                                onChange={this.handleChangeEndDate}
                                                                className="form-control" minDate={this.state.startDate}
                                                                placeholderText="To" popoverTargetOffset='40px 0px'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <label className="control-label">Technology Stack</label>
                                        <div className="text-wrap"><span className="label label-blue-grey">Angular JS<a
                                            href="#"><i className="fa fa-close"></i></a></span> <span
                                            className="label label-blue-grey">React.js<a href="#"><i
                                            className="fa fa-close"></i></a></span></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Resources</label>
                                        <div className="row multiple-element">
                                            <div className="col-sm-12 col-lg-8 element">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Resource"
                                                           className="form-control text-center"/>
                                                    <span className="input-group-addon">No. of</span>
                                                    <input type="text" placeholder="2"
                                                           className="form-control text-center input-sm"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-lg-8 element">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Resource"
                                                           className="form-control text-center"/>
                                                    <span className="input-group-addon">No. of</span>
                                                    <input type="text" placeholder="2"
                                                           className="form-control text-center input-sm"/>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-lg-8 element">
                                                <div className="input-group">
                                                    <input type="text" placeholder="Resource"
                                                           className="form-control text-center"/>
                                                    <span className="input-group-addon">No. of</span>
                                                    <input type="text" placeholder="2"
                                                           className="form-control text-center input-sm"/>
                                                </div>
                                            </div>
                                            <div className="block-options clear"><a
                                                className="btn btn-sm btn-ghost text-uppercase" data-toggle="tooltip"
                                                title="Add Another Field" href="#"><i className="fa fa-plus"></i> Add
                                                Another Field</a></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Team Members</label>
                                        <div className="row  text-center">
                                            <div className="col-sm-12">
                                                <ul className="team-list clearfix">
                                                    <li><a href="#" className="profile-img img-lg add-team"
                                                           data-toggle="modal" data-target="#addTeam" onClick={this.clearMemberIndexInModal}><i
                                                        className="fa fa-plus" ></i> <span
                                                        className="on-hover circular-block" ></span> </a>
                                                    </li>

                                                    {Object.keys(this.props.teamMembers).map(this.renderTeamMember)}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-actions clearfix">
                                        <div className="pull-right">
                                            <button className="btn btn-sm btn-success" type="submit"><i
                                                className="fa fa-angle-right"></i>Save
                                            </button>
                                            <button className="btn btn-sm btn-default" type="reset"><i
                                                className="fa fa-repeat"></i>Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <TeamMemberForm actions={this.props.actions} teamMembers={this.props.teamMembers} memberIndexInModal={this.props.memberIndexInModal}/>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            budgetTypes: state.crudReducer.get(resourceConstant.BUDGET_TYPES),
            projectTypes: state.crudReducer.get(resourceConstant.PROJECT_TYPES),
            projectStatus: state.crudReducer.get(resourceConstant.PROJECT_STATUS),
            teamMembers: state.createProject.teamMembers,
            memberIndexInModal: state.createProject.memberIndexInModal
        }

    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(createProjectActions, dispatch)
        }
    }

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
})();