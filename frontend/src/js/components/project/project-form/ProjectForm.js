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
    var resourceConstants = require('../../../constants/resourceConstants');
    var urlConstants = require('../../../constants/urlConstants');
    var messageConstants = require('../../../constants/messageConstants');

    //libraries
    var moment = require('moment');
    var _ = require('lodash');
    var Toastr = require('toastr');
    var Select = require('react-select');

    //components
    var EntityHeader = require('../../common/header/EntityHeader');
    var TechnologyStack = require('./TechnologyStack');
    var SelectOption = require('./SelectOption');
    var ContractContainer = require('./contract/ContractContainer');
    var ReasonModal = require('./ReasonModal');

    //utils
    var formValidator = require('../../../utils/formValidator');
    var employeeUtil = require('../../../utils/employeeUtil');

    //services
    var coreApiService = require('../../../services/api-services/coreApiService');
    var authApiService = require('../../../services/api-services/authApiService');
    var resourceApiService = require('../../../services/api-services/resourceApiService');
    var contractMemberService = require('../../../services/contractMemberService');
    var convertContractHash = require('../../../services/convertContractHash');

    //actions
    var crudActions = require('../../../actions/crudActions');
    var apiActions = require('../../../actions/apiActions');
    var contractActions = require('../../../actions/contractActions');
    var contractMemberActions = require('../../../actions/contractMemberActions');
    var allocationActions = require('../../../actions/allocationActions');

    var ProjectForm = React.createClass({
        getInitialState: function () {
            return {
                technologyStack: [],
                projectName: null,
                showValidityIcon: false,
                isUnique: true,
                isRequesting: false
            }
        },

        componentWillMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstants.PROJECTS, this.props.params.id);
            }
            this.props.actions.fetch(resourceConstants.BUDGET_TYPES,resourceConstants.BUDGET_TYPES);
            this.props.actions.fetch(resourceConstants.PROJECT_STATUS, resourceConstants.PROJECT_STATUS);
            this.props.actions.fetch(resourceConstants.PROJECT_TYPES, resourceConstants.PROJECT_TYPES);
            this.props.actions.fetch(resourceConstants.CLIENTS, resourceConstants.CLIENTS);
            this.props.actions.fetch(resourceConstants.PROJECT_ROLES, resourceConstants.PROJECT_ROLES);
        },

        componentWillReceiveProps: function (props) {
            if (this.props.params.id) {
                var title = (!this.state.projectName) ? props.selectedItem.projects.title : this.state.projectName;

                this.setState({projectName: title});
                this.setState({technologyStack: props.selectedItem.projects.tags});
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstants.PROJECTS);
            this.props.actions.clearContracts();
            this.props.actions.apiClearState();

            //fixes modal freezing the application when back is pressed while it is open
            $('#addContractMember').modal('hide');
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
                              option={this.props.clients[key].name}/>
            )
        },

        //called when form is submitted
        saveProject: function (event) {
            event.preventDefault();
            var project = this.getFormData();

            var requiredField = {
                'title': this.refs.title.value
            };

            if (formValidator.isValid(requiredField) && this.state.isUnique) {
                if (this.props.params.id) {
                    $('#addReason').modal('show');
                } else {
                    this.props.actions.addItem(resourceConstants.PROJECTS, project);
                }
            } else {
                Toastr.error(messageConstants.FORM_INVALID_SUBMISSION_MESSAGE, messageConstants.TOASTR_INVALID_HEADER);
            }
        },

        getFormData: function () {
           var project = _.cloneDeep(this.props.selectedItem.projects);
            var convertedContracts = convertContractHash.toBackEndHash(this.props.contracts);
            project.contracts = convertedContracts;
            project.tags = this.state.technologyStack;

            return project;
        },

        updateProject: function (reason) {
            var project = this.getFormData();
            project['reason'] = reason;

            var requiredFieldForUpdate = {
                'reason': reason
            };

            if (formValidator.isValid(requiredFieldForUpdate) && this.state.isUnique) {
                $('#addReason').modal('hide');
                this.props.actions.updateItem(resourceConstants.PROJECTS, project, this.props.params.id);
            } else {
                Toastr.error(messageConstants.FORM_INVALID_SUBMISSION_MESSAGE, messageConstants.TOASTR_INVALID_HEADER);
            }
        },

        validateTitle: function (event) {
            this.setState({showValidityIcon: false});
            var title = this.refs.title.value;
            var that = this;
            var elementId = $(event.target).attr('id');

            if (title && title != this.state.projectName) {
                that.setState({isRequesting: true});
                resourceApiService.fetch(resourceConstants.PROJECTS, {title: title}).then(function (response) {
                    that.setState({isRequesting: false});

                    if (response.body.count) {
                        formValidator.showErrors(elementId, messageConstants.PROJECT_NAME_EXISTS_MESSAGE);
                        that.state.isUnique = false;
                    } else {
                        formValidator.showSuccess(elementId);
                        that.setState({showValidityIcon: true, isUnique: true});
                    }

                }, function (error) {
                    that.setState({isRequesting: false});

                    if (error.status == 401) {
                        authApiService.refreshSession().then(function (response) {
                            that.validateTitle(that.refs.title.dispatchEvent(new Event('blur')));
                        });
                    } else {
                        Toastr.error(error.response.body.error || error.response.body[0].error);
                    }
                });
            } else {
                formValidator.validateField(event);
            }
        },

        resetField: function () {
            this.setState({showValidityIcon: false});
            formValidator.removeFeedback('title');
        },

        handleChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(resourceConstants.PROJECTS, key, value);
        },

        handleSelectOptionChange: function(event){
          this.props.actions.handleSelectOptionChange(resourceConstants.PROJECTS, event.target.name, event.target.value);
        },

        handleAutoCompleteChange: function (employee) {
            var employeeId = employee && employee.value;
            var employeeFullName = employee && employee.label;

            this.props.actions.handleAutoCompleteChange('projects', 'accountManager', employeeId, employeeFullName);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project':'Add Project'}
                                  routes={this.props.routes}
                                  title={this.props.selectedItem.projects.title || 'Project'}
                                  apiState={this.props.apiState}/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="block-title-border">Project Details</div>
                                <form className="form-bordered" method="post" onSubmit={this.saveProject}
                                      id="projectForm">
                                    <fieldset disabled={this.props.apiState.isRequesting}>

                                        <div className="form-group has-feedback">
                                            <label>Project Name *</label>
                                            <input type="text" placeholder="Project Name" name="title" ref="title"
                                                   value={this.props.selectedItem.projects.title}
                                                   className="form-control" id="title"
                                                   onChange={this.handleChange}
                                                   onBlur={this.validateTitle}
                                                   onFocus={this.resetField}/>
                                            {this.state.isRequesting && <span
                                                className="form-control-feedback validation-icon"
                                                aria-hidden="true"> <img src="img/ajax-loader-3.gif"/></span>}
                                            {this.state.showValidityIcon && <span
                                                className="glyphicon glyphicon-ok form-control-feedback validation-icon"
                                                aria-hidden="true"></span>}

                                            <span className="help-block" ref="availableMessage"></span>
                                        </div>

                                        <div className="form-group">
                                            <label>Description</label>
                                    <textarea name="description" ref="description"
                                              value={this.props.selectedItem.projects.description}
                                              placeholder="Short description about the project."
                                              className="form-control" rows="4" id="description"
                                              onChange={this.handleChange}></textarea>
                                            <span className="help-block"></span>
                                        </div>

                                        <div className="form-group clearfix">
                                            <div className="row multiple-element">

                                                <div className="col-md-6 col-lg-4 element">
                                                    <label className="control-label">Project Type</label>
                                                    <select className="form-control"
                                                            name="projectType" ref="projectType"
                                                            id="projectType"
                                                            value={this.props.selectedItem.projects.projectType &&
                                                               this.props.selectedItem.projects.projectType.id}
                                                            onChange={this.handleSelectOptionChange}
                                                    >
                                                        <option value="0">Please Select</option>

                                                        {Object.keys(this.props.projectTypes).map(this.renderProjectType)}

                                                    </select>
                                                    <span className="help-block"></span>
                                                </div>

                                                <div className="col-md-6 col-lg-4 element">
                                                    <label htmlFor="example-select" className="control-label">Project
                                                        Status</label>
                                                    <select className="form-control"
                                                            ref="projectStatus" name="projectStatus"
                                                            id="projectStatus"
                                                            value={this.props.selectedItem.projects.projectStatus &&
                                                               this.props.selectedItem.projects.projectStatus.id}
                                                            onChange={this.handleSelectOptionChange}>
                                                        <option value="0">Please
                                                            Select
                                                        </option>

                                                        {Object.keys(this.props.projectStatus).map(this.renderProjectStatus)}

                                                    </select>
                                                    <span className="help-block"></span>
                                                </div>

                                                <div className="col-md-6 col-lg-4 element">
                                                    <label>Account Manager</label>
                                                    <Select.Async name="employee"
                                                                  value={contractMemberService.getAutoCompleteValue(this.props.selectedItem.projects.accountManager)}
                                                                  loadOptions={contractMemberService.loadEmployees}
                                                                  onChange={this.handleAutoCompleteChange}
                                                                  disabled={this.props.apiState.isRequesting}
                                                                  minimumInput={1}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group clearfix">
                                            <div className="row multiple-element">

                                                <div className="col-md-6 col-lg-4 element">
                                                    <label htmlFor="example-select"
                                                           className="control-label">Client</label>
                                                    <select className="form-control"
                                                            ref="client" name="client"
                                                            id="client"
                                                            value={this.props.selectedItem.projects.client &&
                                                               this.props.selectedItem.projects.client.id}
                                                            onChange={this.handleSelectOptionChange}>
                                                        <option value="0">Please Select</option>
                                                        {Object.keys(this.props.clients).map(this.renderClient)}
                                                    </select>
                                                    <span className="help-block"></span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="form-group clearfix">
                                            <label className="control-label">Technology Stack</label>
                                            <TechnologyStack technologyStack={this.state.technologyStack}
                                                             removeTag={this.removeTag}
                                                             addTag={this.addTag}/>
                                            <span className="help-block"></span>
                                        </div>

                                        <ContractContainer params={this.props.params}
                                                           employees={this.props.employees}
                                                           budgetTypes={this.props.budgetTypes}
                                                           projectRoles={this.props.projectRoles}
                                                           selectedItem={this.props.selectedItem}
                                                           apiState={this.props.apiState}
                                                           contracts={this.props.contracts}
                                                           allocations={this.props.allocations}
                                                           actions={this.props.actions}
                                                           selectedContractMember={this.props.selectedContractMember}/>

                                        <div className="form-group form-actions clearfix">
                                            <div className="pull-right">
                                                <button className="btn btn-sm btn-success"
                                                        type="submit"
                                                        id="save-btn">
                                                    <i className="fa fa-check"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                                </button>
                                                <button className="btn btn-sm btn-danger" type="button"
                                                        onClick={browserHistory.goBack}>
                                                    <i className="fa fa-remove"></i>Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>

                    <ReasonModal updateProject={this.updateProject}/>

                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            budgetTypes: state.crudReducer.budgetTypes,
            projectTypes: state.crudReducer.projectTypes,
            projectStatus: state.crudReducer.projectStatus,
            projectRoles: state.crudReducer.projectRoles,
            clients: state.crudReducer.clients,
            selectedItem: state.crudReducer.selectedItem,
            apiState: state.apiReducer,
            contracts: state.contractReducer.contracts,
            employees: state.crudReducer.employees,
            allocations: state.contractReducer.allocations,
            selectedContractMember: state.contractReducer.selectedContractMember
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({},
                crudActions,
                apiActions,
                contractActions,
                contractMemberActions,
                allocationActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

})();