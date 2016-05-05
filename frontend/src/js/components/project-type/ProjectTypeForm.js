;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var browserHistory = require('react-router').browserHistory;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstants = require('../../constants/resourceConstants');
    var urlConstants = require('../../constants/urlConstants');
    var messageConstants = require('../../constants/messageConstants');

    //components
    var EntityHeader = require('../common/header/EntityHeader');

    //utils
    var formValidator = require('../../utils/formValidator');

    //actions
    var apiActions = require('../../actions/apiActions');
    var crudActions = require('../../actions/crudActions');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');

    var ProjectTypeForm = React.createClass({
        getInitialState: function(){
            return{
                autoFocus: true
            }
        },

        componentWillMount: function () {
            if (this.props.params.id) {
                this.setState({autoFocus: false});
                this.props.actions.fetchById(resourceConstants.PROJECT_TYPES, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstants.PROJECT_TYPES);
            this.props.actions.apiClearState();
        },

        //called when form is submitted
        saveProjectType: function (event) {
            event.preventDefault();

            var projectType = {
                title: this.refs.title.value
            }

            if (formValidator.isValid(projectType)) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstants.PROJECT_TYPES, projectType, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstants.PROJECT_TYPES, projectType);
                }
            } else {
                Toastr.error(messageConstants.FORM_INVALID_SUBMISSION_MESSAGE, messageConstants.TOASTR_INVALID_HEADER);
            }
        },

        fieldChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(resourceConstants.PROJECT_TYPES, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id)?'Edit Project Type':'Add Project Type'}
                                  routes={this.props.routes}
                                  title={this.props.selectedItem.projectTypes.title || 'Project Type'}
                                  apiState={this.props.apiState}/>
                    <div className="block">
                        <div className="block-title-border">Project Type Details</div>
                        <form className="form-bordered" method="post" onSubmit={this.saveProjectType}>
                            <fieldset disabled={this.props.apiState.isRequesting}>
                                <div className="form-group">
                                    <label>Project Type *</label>
                                    <input type="text" ref="title" name="title"
                                           value={this.props.selectedItem.projectTypes.title}
                                           onChange={this.fieldChange}
                                           onBlur={formValidator.validateField}
                                           onFocus={formValidator.removeFeedback.bind(null, 'title')}
                                           placeholder="Project Type"
                                           className="form-control"
                                           id="title"
                                           autoFocus={this.state.autoFocus}
                                    />
                                    <span className="help-block"></span>
                                </div>
                                <div className="form-group form-actions clearfix">
                                    <div className="pull-right">
                                        <button className="btn btn-sm btn-success"
                                                type="submit"
                                                id="save-btn">
                                            <i className="fa fa-check"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                        </button>
                                        <button className="btn btn-sm btn-danger"
                                                type="button"
                                                onClick={browserHistory.goBack}>
                                            <i className="fa fa-remove"></i>Cancel
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            selectedItem: state.crudReducer.selectedItem,
            apiState: state.apiReducer
        }
    };

    var mapDispatchToProps = function (dispatch) {
        return {
            actions: bindActionCreators(_.assign({}, crudActions, apiActions), dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectTypeForm);

})();