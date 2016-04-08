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
    var messageConstant = require('../../constants/messageConstant');

    //libraries
    var moment = require('moment');
    var _ = require('lodash');
    var Toastr = require('toastr');

    var Select = require('react-select');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var TechnologyStack = require('./TechnologyStack');
    var SelectOption = require('./SelectOption');
    var ContractContainer = require('./contract/ContractContainer');
    var ReasonModal = require('./ReasonModal');
    var formValidator = require('../../util/formValidator');

    //util
    var apiUtil = require('../../util/apiUtil');
    var convertContractHash = require('../../util/convertContractHash');
    var formUtil = require('../../util/formUtil');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');
    var contractActions = require('../../actions/contractActions');

    var ProjectForm = React.createClass({
        getInitialState: function () {
            return {
                technologyStack: [],
                projectName: null,
                isProjectNameValid: false,
                isRequesting: false
            }
        },

        componentDidMount: function () {
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.PROJECTS, this.props.params.id);
            }
            this.props.actions.fetchAll(resourceConstant.BUDGET_TYPES);
            this.props.actions.fetchAll(resourceConstant.PROJECT_STATUS);
            this.props.actions.fetchAll(resourceConstant.PROJECT_TYPES);
            this.props.actions.fetchAll(resourceConstant.CLIENTS);
            this.props.actions.fetchAll(resourceConstant.PROJECT_ROLES);
            this.props.actions.fetchAllFromCore(resourceConstant.EMPLOYEES);

            formUtil.disableForm('projectForm');
        },

        componentWillReceiveProps: function (props) {
            if (this.props.params.id) {
                var title = (!this.state.projectName) ? props.selectedItem.projects.title : this.state.projectName;

                this.setState({projectName: title});
                this.setState({technologyStack: props.selectedItem.projects.tags});
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.PROJECTS);
            this.props.actions.clearContracts();
            this.props.actions.apiClearState();

            //fixes modal freezing the application when back is pressed while it is open
            $('#addContractMember').modal('hide');
        },

        loadEmployees: function (input) {
            return apiUtil.fetchByQueryFromCore(resourceConstant.EMPLOYEES, input).then(function (response) {
                var options = [];
                for (var i = 0; i < response.body.data.length; i++) {
                    if (!response.body.data[i].middleName || response.body.data[i].middleName == 'NULL') {
                        var employeeName = response.body.data[i].firstName + ' ' + response.body.data[i].lastName;
                    } else {
                        var employeeName = response.body.data[i].firstName + ' ' + response.body.data[i].middleName + ' ' + response.body.data[i].lastName;
                    }

                    options.push({value: response.body.data[i].id, label: employeeName});
                }

                return {options: options};
            }, function (error) {
                if (error.status == 401) {
                    apiUtil.refreshSession();
                }
            });
        },

        handleAutoCompleteChange: function (value) {
            this.props.actions.handleSelectOptionChange('projects', 'accountManager', value.value);
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

        //called when form is submitted
        saveProject: function (event) {
            event.preventDefault();
            var project = this.getFormData();

            var requiredField = {
                'title': this.refs.title.value
            };

            if (formValidator.isValid(requiredField)) {
                if (this.props.params.id) {
                    $('#addReason').modal('show');
                } else {
                    this.props.actions.addItem(resourceConstant.PROJECTS, project);
                }
            } else {
                Toastr.error(messageConstant.FORM_INVALID_SUBMISSION_MESSAGE, messageConstant.TOASTR_INVALID_HEADER);
            }
        },

        getFormData: function () {
            var contracts = convertContractHash.toBackEndHash(this.props.contracts);

            if (this.props.selectedItem.projects.accountManager && this.props.selectedItem.projects.accountManager.id) {
                var accountManager = {id: this.props.selectedItem.projects.accountManager.id};
            } else {
                var accountManager = null;
            }

            return {
                'title': this.refs.title.value,
                'description': this.refs.description.value,
                'projectType': (this.refs.projectType.value != 0) ? {"id": this.refs.projectType.value} : null,
                'projectStatus': (this.refs.projectStatus.value != 0) ? {"id": this.refs.projectStatus.value} : null,
                'client': (this.refs.client.value != 0) ? {"id": this.refs.client.value} : null,
                'tags': this.state.technologyStack,
                'accountManager': accountManager,
                'contracts': contracts
            };
        },

        updateProject: function (reason) {
            var project = this.getFormData();
            project['reason'] = reason;
            var requiredFieldForUpdate = {
                'reason': reason
            };

            if (formValidator.isValid(requiredFieldForUpdate)) {
                $('#addReason').modal('hide');
                this.props.actions.updateItem(resourceConstant.PROJECTS, project, this.props.params.id);
            } else {
                Toastr.error(messageConstant.FORM_INVALID_SUBMISSION_MESSAGE, messageConstant.TOASTR_INVALID_HEADER);
            }
        },

        checkTitle: function (title) {
            this.setState({isRequesting: false});

            if (title.length === 0) {
                this.refs.title.parentElement.className = 'form-group has-success has-feedback';
                this.setState({isProjectNameValid: true});
                this.refs.availableMessage.innerHTML = '';
            } else {
                this.refs.title.parentElement.className = 'form-group has-error has-feedback';
                this.refs.availableMessage.innerHTML = messageConstant.PROJECT_NAME_EXISTS_MESSAGE;
            }
        },

        validateTitle: function (event) {
            this.setState({isProjectNameValid: false});

            var title = this.refs.title.value;

            if (title && title != this.state.projectName) {
                this.setState({isRequesting: true});
                apiUtil.fetchByTitle(resourceConstant.PROJECTS, title, this.checkTitle);

            } else {
                formValidator.validateField(event);
            }
        },

        handleChange: function (event) {
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
                                <form className="form-bordered" method="post" onSubmit={this.saveProject} id="projectForm">
                                    <fieldset disabled={this.props.apiState.isRequesting}>

                                        <div className="form-group has-feedback">
                                            <label>Project Name *</label>
                                            <input type="text" placeholder="Project Name" name="title" ref="title"
                                                   value={this.props.selectedItem.projects.title}
                                                   className="form-control" id="title"
                                                   onChange={this.handleChange}
                                                   onBlur={this.validateTitle}
                                                   onFocus={formValidator.removeError.bind(null, 'title')}/>
                                            {this.state.isRequesting && <span
                                                className="form-control-feedback validation-icon"
                                                aria-hidden="true"> <img src="img/ajax-loader-3.gif"/></span>}
                                            {this.state.isProjectNameValid && <span
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
                                                            onChange={this.handleChange}
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
                                                            onChange={this.handleChange}>
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
                                                                  value={this.props.selectedItem.projects.accountManager &&
                                                        this.props.selectedItem.projects.accountManager.id}
                                                                  loadOptions={this.loadEmployees}
                                                                  onChange={this.handleAutoCompleteChange}
                                                                  disabled={this.props.apiState.isRequesting}/>
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
                                                            onChange={this.handleChange}>
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

                                        <ContractContainer params={this.props.params}/>

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
            )
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
            contracts: state.contractReducer.contracts
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions, contractActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
})();