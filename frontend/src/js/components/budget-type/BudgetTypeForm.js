/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var browserHistory = require('react-router').browserHistory;
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');
    var messageConstant = require('../../constants/messageConstant');

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var formValidator = require('../../util/formValidator');

    //actions
    var crudActions = require('../../actions/crudActions');
    var apiActions = require('../../actions/apiActions');

    //libraries
    var _ = require('lodash');

    //libraries
    var Toastr = require('toastr');

    var BudgetTypeForm = React.createClass({
        componentDidMount: function () {
            //fill form with data for editing
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.BUDGET_TYPES, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.BUDGET_TYPES);
            this.props.actions.apiClearState();
        },

        //call when form is submitted
        saveBudgetType: function (event) {
            event.preventDefault();

            var budgetType = {
                title: this.refs.budgetType.value
            }

            if (formValidator.isValid(budgetType)) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.BUDGET_TYPES, budgetType, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.BUDGET_TYPES, budgetType);
                }
            } else {
                Toastr.error(messageConstant.FORM_INVALID_SUBMISSION_MESSAGE, messageConstant.TOASTR_INVALID_HEADER);
            }
        },

        //handle change over every key press in the input fields
        handleChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(resourceConstant.BUDGET_TYPES, key, value);
        },

        render: function () {
            return (
                <div>
                    <EntityHeader header={(this.props.params.id) ? 'Edit Budget Type' : 'Add Budget Type'}
                                  routes={this.props.routes} title={this.props.selectedItem.budgetTypes && this.props.selectedItem.budgetTypes.title || 'Budget Type'}/>
                    <div className="block">
                        <div
                            className="block-title-border">Budget Type Details
                        </div>
                        <form className="form-bordered" method="post" onSubmit={this.saveBudgetType}>
                            <fieldset disabled={this.props.apiState.isRequesting}>
                                <div className="form-group">
                                    <label>Budget Type *</label>
                                    <input name="title" type="text" ref="budgetType" placeholder="Budget Type"
                                           className="form-control"
                                           value={this.props.selectedItem.budgetTypes.title}
                                           id="title"
                                           onBlur={formValidator.validateField}
                                           onFocus={formValidator.removeFeedback.bind(null, 'title')}
                                           onChange={this.handleChange}
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

    module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetTypeForm);

})();