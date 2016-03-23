/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var browserHistory = require('react-router').browserHistory;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //libraries
    var DatePicker = require('react-datepicker');
    var moment = require('moment');
    var _ = require('lodash');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var TechnologyStack = require('./TechnologyStack');
    var SelectOption = require('./SelectOption');
    var TeamMemberForm = require('./member/TeamMemberForm');
    var TeamMember = require('./member/TeamMember');
    var ReasonModal = require('./ReasonModal');
    var AccountManager = require('./AccountManager');
    var formValidator = require('../../util/FormValidator');
    var crudActions = require('../../actions/crudActions');
    var teamMemberActions = require('../../actions/teamMemberActions');
    var ApiUtil = require('../../util/ApiUtil');

    var isProjectNameValid = true;

    var ProjectForm = React.createClass({
        getInitialState: function () {
            return {
                technologyStack: [],
                accountManager: {},
                startDate: moment(),
                endDate: moment(),
                projectName: null
            }
        },

        componentDidMount: function () {
            this.props.actions.fetchAll(resourceConstant.BUDGET_TYPES);
            this.props.actions.fetchAll(resourceConstant.PROJECT_STATUS);
            this.props.actions.fetchAll(resourceConstant.PROJECT_TYPES);
            this.props.actions.fetchAll(resourceConstant.CLIENTS);
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECTS, this.props.params.id);
            }
        },
        componentWillReceiveProps: function (props) {
            if (this.props.params.id) {
                this.setSelectedItem('projectType', props.selectedItem.projects.projectType);
                this.setSelectedItem('projectStatus', props.selectedItem.projects.projectStatus);
                this.setSelectedItem('budgetType', props.selectedItem.projects.budgetType);
                this.setSelectedItem('client', props.selectedItem.projects.client);
                this.setState({technologyStack: props.selectedItem.projects.tags});
                var title = (!this.state.projectName) ? props.selectedItem.projects.title : this.state.projectName;
                this.setState({projectName: title});
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearMemberState();
            isProjectNameValid = true;
            this.props.actions.clearSelectedItem(resourceConstant.PROJECTS);
        },

        setManager: function (value) {
            this.setState({accountManager: value});
        },

        setSelectedItem: function (type, state) {
            if (state) {
                $('#' + type).val(state.id).selected = true;
            } else {
                $('#' + type).val(0).selected = true;
            }
        },

        addTag: function (value) {
            this.state.technologyStack.push(value);
            this.setState({technologyStack: this.state.technologyStack});
        },

        removeTag: function (index) {
            var techStack = this.state.technologyStack;

            if (index != null) {
                techStack.splice(index, 1);
            }
            this.setState({technologyStack: techStack});
        },

        handleChangeStartDate: function (date) {
            this.setState({
                startDate: date
            });
        },

        handleChangeEndDate: function (date) {
            this.setState({
                endDate: date
            });
        },

        renderBudgetType: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.budgetTypes[key].id}
                              option={this.props.budgetTypes[key].title}/>
            )
        },

        renderProjectType: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.projectTypes[key].id}
                              option={this.props.projectTypes[key].title}/>
            )
        },

        renderProjectStatus: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.projectStatus[key].id}
                              option={this.props.projectStatus[key].title}/>
            )
        },

        renderClient: function (key) {
            return (
                <SelectOption key={key} index={key} id={this.props.clients[key].id}
                              option={this.props.clients[key].email}/>
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
                var parentElement = $('#' + elementId).parent();

                if (!parentElement.hasClass('has-error')) {
                    parentElement.addClass('has-error');
                }
                parentElement.children('span').html(errors[elementId]);
            }
        },

        //called when form is submitted
        saveProject: function (event) {
            event.preventDefault();

            //temporary fix until backEnd tasks are completed

            var tempProjectMember = _.cloneDeep(this.props.teamMembers);

            for (var key in tempProjectMember) {
                tempProjectMember[key].joinDate = tempProjectMember[key].joinDate.format('YYYY-MM-DD');
                tempProjectMember[key].endDate = tempProjectMember[key].endDate.format('YYYY-MM-DD');
                delete tempProjectMember[key]['memberRole'];
            }
            var project = this.getFormData();
            var requiredField = {
                'title': this.refs.title.value
            };

            formValidator.validateForm(requiredField);

            if (formValidator.isValid()) {
                if (this.props.params.id) {
                    $('#addReason').modal('show');
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECTS, project);
                }
            }
        },

        getFormData: function () {
            return {
                'title': this.refs.title.value,
                'description': this.refs.description.value,
                'projectType': (this.refs.projectType.value != 0) ? {"id": this.refs.projectType.value} : null,
                'projectStatus': (this.refs.projectStatus.value != 0) ? {"id": this.refs.projectStatus.value} : null,
                'client': (this.refs.client.value != 0) ? {"id": this.refs.client.value} : null,
                'budgetType': (this.refs.budgetType.value != 0) ? {"id": this.refs.budgetType.value} : null,
                'startDate': (this.state.startDate) ? this.state.startDate.format('YYYY-MM-DD') : '',
                'endDate': (this.state.endDate) ? this.state.endDate.format('YYYY-MM-DD') : '',
                'tags': this.state.technologyStack
            };
        },

        updateProject: function () {
            var project = this.getFormData();
            project['reason'] = $('#reason').val();
            var requiredField = {
                'reason': $('#reason').val()
            };
            formValidator.validateForm(requiredField);
            if (formValidator.isValid()) {
                $('#addReason').modal('hide');
                this.props.actions.updateItem(resourceConstant.PROJECTS, project, this.props.params.id);
            }
        },

        checkTitle: function (title) {
            if (title.length === 0) {
                this.refs.title.parentElement.className = 'form-group has-success';
                this.refs.availableMessage.innerHTML = '';
                isProjectNameValid = true;
            } else {
                this.refs.title.parentElement.className = 'form-group has-error';
                this.refs.availableMessage.innerHTML = 'Project name already exists.';
                isProjectNameValid = false;
            }
        },

        validateTitle: function (event) {
            var title = this.refs.title.value;
            if (title && title != this.state.projectName) {
                ApiUtil.fetchByQuery(resourceConstant.PROJECTS, title, this.checkTitle, 'all');
            } else if (!title) {
                formValidator.validateField(event);
            } else {
                this.refs.title.parentElement.className = 'form-group';
                this.refs.availableMessage.innerHTML = '';
            }
        },

        fieldChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(resourceConstant.PROJECTS, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project':'Add Project'}
                                  routes={this.props.routes}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="block-title-border">Project Details</div>
                                <form className="form-bordered" method="post" onSubmit={this.saveProject}>
                                    <div className="form-group">
                                        <label>Project Name</label>
                                        <input type="text" placeholder="Project Name" name="title" ref="title"
                                               value={this.props.selectedItem.projects.title}
                                               className="form-control" id="title" onChange={this.fieldChange}
                                               onBlur={this.validateTitle}
                                               onFocus={formValidator.removeError.bind(null, 'title')}/>
                                        <span className="help-block" ref="availableMessage"></span>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                    <textarea name="description" ref="description"
                                              value={this.props.selectedItem.projects.description}
                                              placeholder="Short description about the project."
                                              className="form-control" rows="4" id="description"
                                              onChange={this.fieldChange}></textarea>
                                        <span className="help-block"></span>

                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className="control-label">Project Type</label>
                                                <select className="form-control" ref="projectType" id="projectType">
                                                    <option value="0">Please Select</option>
                                                    {Object.keys(this.props.projectTypes).map(this.renderProjectType)}
                                                </select>
                                                <span className="help-block"></span>

                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label className=" control-label">Budget Type</label>
                                                <select className="form-control" ref="budgetType" id="budgetType">
                                                    <option value="0">
                                                        Please Select
                                                    </option>
                                                    {Object.keys(this.props.budgetTypes).map(this.renderBudgetType)}
                                                </select>
                                                <span className="help-block"></span>
                                            </div>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label htmlFor="example-select" className="control-label">Project
                                                    Status</label>
                                                <select className="form-control" ref="projectStatus" id="projectStatus">
                                                    <option value="0">Please
                                                        Select
                                                    </option>
                                                    {Object.keys(this.props.projectStatus).map(this.renderProjectStatus)}
                                                </select>
                                                <span className="help-block"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group clearfix">
                                        <div className="row multiple-element">
                                            <AccountManager setManager={this.setManager}
                                                            fieldChange={this.fieldChange}/>
                                            <div className="col-md-6 col-lg-4 element">
                                                <label htmlFor="example-select" className="control-label">Client</label>
                                                <select className="form-control" ref="client" id="client">
                                                    <option value="0">Please
                                                        Select
                                                    </option>
                                                    {Object.keys(this.props.clients).map(this.renderClient)}
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
                                                         removeTag={this.removeTag} addTag={this.addTag}/>
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
                                            <button className="btn btn-sm btn-success" type="submit" id="save-btn"><i
                                                className="fa fa-check"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                            </button>
                                            <button className="btn btn-sm btn-danger" type="button"
                                                    onClick={browserHistory.goBack}><i
                                                className="fa fa-remove"></i>Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <TeamMemberForm actions={this.props.actions} teamMembers={this.props.teamMembers}
                                    memberIndexInModal={this.props.memberIndexInModal}/>
                    <ReasonModal updateProject={this.updateProject}/>
                </div>
            )
        }
    });

    var mapStateToProps = function (state) {
        return {
            budgetTypes: state.crudReducer.budgetTypes,
            projectTypes: state.crudReducer.projectTypes,
            projectStatus: state.crudReducer.projectStatus,
            clients: state.crudReducer.clients,
            teamMembers: state.teamMemberReducer.teamMembers,
            memberIndexInModal: state.teamMemberReducer.memberIndexInModal,
            selectedItem: state.crudReducer.selectedItem
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, teamMemberActions, crudActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
})();