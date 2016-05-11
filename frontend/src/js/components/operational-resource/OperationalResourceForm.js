/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 5/9/16.
 */

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
    var converter = require('../../utils/converter');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //libraries
    var _ = require('lodash');
    var Toastr = require('toastr');
    var Select = require('react-select');

    //services
    var contractMemberService = require('../../services/contractMemberService');

    var OperationalResourceForm = React.createClass({
        getInitialState: function () {
            return {
                autoFocus: true
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstants.OPERATIONAL_RESOURCE);
            this.props.actions.apiClearState();
        },

        //call when form is submitted
        saveOperationalResource: function (event) {
            event.preventDefault();

            var requiredField = {
                employee: this.props.selectedItem.operational.employee && this.props.selectedItem.operational.employee.id || ''
            }

            if (formValidator.isValid(requiredField)) {
                this.props.actions.addItem(converter.getPathParam(resourceConstants.RESOURCE,resourceConstants.OPERATIONAL_RESOURCE), this.props.selectedItem.operational);
            } else {
                Toastr.error(messageConstants.FORM_INVALID_SUBMISSION_MESSAGE, messageConstants.TOASTR_INVALID_HEADER);
            }
        },

        //handle change over every key press in the input fields
        handleAutoCompleteChange: function (employee) {
            var employeeId = employee && employee.value;
            var employeeFullName = employee && employee.label;

            this.props.actions.handleAutoCompleteChange(resourceConstants.OPERATIONAL_RESOURCE, 'employee', employeeId, employeeFullName);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={'Add Operational Resource'}
                                  routes={this.props.routes}
                                  title={'Operational Resource'}
                                  apiState={this.props.apiState}/>
                    <div className="block">
                        <div
                            className="block-title-border">Operational Resource
                        </div>
                        <form className="form-bordered" method="post" onSubmit={this.saveOperationalResource}>
                            <fieldset disabled={this.props.apiState.isRequesting}>
                                <div className="form-group clearfix">
                                        <label>Employee *</label>
                                        <Select.Async name="employee"
                                                      value={contractMemberService.getAutoCompleteValue(this.props.selectedItem.operational.employee)}
                                                      loadOptions={contractMemberService.loadEmployees}
                                                      onChange={this.handleAutoCompleteChange}
                                                      disabled={this.props.apiState.isRequesting}
                                                      minimumInput={1}
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
            )
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

    module.exports = connect(mapStateToProps, mapDispatchToProps)(OperationalResourceForm);

})();