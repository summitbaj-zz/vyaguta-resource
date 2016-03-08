/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use-strict';
    var React = require('react');
    var ProjectHeader = require('./ProjectHeader');

    var TechnologyStack = require('./TechnologyStack');
    var ApiUtil = require('../../util/ApiUtil');
    var history = require('react-router').History;

    var resourceConstant = require('../../constants/resourceConstant');
    var SelectOption = require('./SelectOption');
    var urlConstant = require('../../constants/urlConstant');

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

    var Toastr = require('toastr');

    var AccountManager = require('./AccountManager');
    var formValidator = require('../../util/FormValidator');

    var isManagerValid = false;

    var ProjectForm = React.createClass({
        mixins: [history],

        getInitialState: function () {
            return {
                technologyStack: [],
                accountManager: [],
                startDate: moment(),
                endDate: moment()
            }
        },

        setManager: function (value) {
            this.setState({accountManager: value});
        },

        addNewTag: function (value) {
            var newTag = {title: value};
            this.state.technologyStack.push(newTag);
            this.setState({technologyStack: this.state.technologyStack});
        },

        removeTag: function (index) {
            var techStack = this.state.technologyStack;
            if (index != null) {
                techStack.splice(index, 1);
            }
            this.setState({technologyStack: techStack});
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

        clearMemberIndexInModal: function () {
            this.props.actions.clearMemberIndex();
            document.querySelector('#team-member-form').reset();
        },

        showErrors: function (errors) {
            for (var elementId in errors) {
                var parentElement = document.querySelector('#' + elementId).parentElement;
                parentElement.className += " has-error";
                parentElement.querySelector('span').innerHTML = errors[elementId];
            }
        },

        saveProject: function (event) {
            event.preventDefault();
            var tempProjectMember = _.cloneDeep(this.props.teamMembers);

            for (var key in tempProjectMember) {
                tempProjectMember[key].joinDate = tempProjectMember[key].joinDate.format('YYYY-MM-DD');
                tempProjectMember[key].endDate = tempProjectMember[key].endDate.format('YYYY-MM-DD');
                delete tempProjectMember[key]['memberRole'];
            }

            var project = {
                'title': this.refs.title.value,
                'description': this.refs.description.value,
                'projectType': {"id": this.refs.projectType.value},
                'projectStatus': {"id": this.refs.projectStatus.value},
                'budgetType': {"id": this.refs.budgetType.value},
                'startDate': this.state.startDate.format('YYYY-MM-DD'),
                'endDate': this.state.endDate.format('YYYY-MM-DD'),
                'tags': this.state.technologyStack,
                'projectMembers': tempProjectMember
            };

            var that = this;

            if (formValidator.isValid(project)) {

                ApiUtil.create(resourceConstant.PROJECTS, project, function (data) {
                    document.querySelector('#save-btn').disabled = true;
                    that.history.pushState(null, urlConstant.PROJECTS.INDEX);
                    Toastr.success("Project Successfully Added");
                });
            } else {
                this.showErrors(formValidator.errors)
            }
        },

        render: function () {
            return (
                <div>
                    <ProjectHeader title="Add Project" routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="block-title-border">Project Details</div>
                                <form className="form-bordered" method="post" onSubmit={this.saveProject}>
                                    <div className="form-group">
                                        <label>Project Name</label>
                                        <input type="text" placeholder="Project Name" name="title" ref="title"
                                               className="form-control" id="title"/>
                                        <span className="help-block"></span>

                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                    <textarea name="description" ref="description"
                                              placeholder="Short description about the project."
                                              className="form-control" rows="4" id="description"></textarea>
                                        <span className="help-block"></span>

                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Project Type</label>
                                                <select className="form-control" ref="projectType">
                                                    <option value="0">Please Select</option>
                                                    {Object.keys(this.props.projectTypes).map(this.renderProjectType)}
                                                </select>
                                                <span className="help-block"></span>

                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className=" control-label">Budget Type</label>
                                                <select className="form-control" ref="budgetType">
                                                    <option value="0">Please Select</option>
                                                    {Object.keys(this.props.budgetTypes).map(this.renderBudgetType)}
                                                </select>
                                                <span className="help-block"></span>

                                            </div>
                                            <AccountManager setManager={this.setManager}/>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label htmlFor="example-select" className="control-label">Project
                                                    Status</label>
                                                <select className="form-control" ref="projectStatus">
                                                    <option value="0">Please Select</option>
                                                    {Object.keys(this.props.projectStatus).map(this.renderProjectStatus)}
                                                </select>
                                                <span className="help-block"></span>

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
                                        <TechnologyStack technologyStack={this.state.technologyStack}
                                                         removeTag={this.removeTag} addNewTag={this.addNewTag} />
                                        <span className="help-block"></span>

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
                                                           data-toggle="modal" data-target="#addTeam"
                                                           onClick={this.clearMemberIndexInModal}><i
                                                        className="fa fa-plus"></i> <span
                                                        className="on-hover circular-block"></span> </a>
                                                    </li>

                                                    {Object.keys(this.props.teamMembers).map(this.renderTeamMember)}

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-actions clearfix">
                                        <div className="pull-right">
                                            <button className="btn btn-sm btn-success" type="submit"><i
                                                className="fa fa-angle-right" id="save-btn"></i>Save
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
                    <TeamMemberForm actions={this.props.actions} teamMembers={this.props.teamMembers}
                                    memberIndexInModal={this.props.memberIndexInModal}/>
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