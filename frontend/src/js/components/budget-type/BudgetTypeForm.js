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

    //components
    var EntityHeader = require('../common/header/EntityHeader');
    var formValidator = require('../../util/FormValidator');
    var crudActions = require('../../actions/crudActions');

    var BudgetTypeForm = React.createClass({
        componentDidMount: function () {
            //fill form with data for editing
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.BUDGET_TYPES, this.props.params.id);
            }
        },

        componentWillUnmount: function () {
            this.props.actions.clearSelectedItem(resourceConstant.BUDGET_TYPES);
        },

        //call when form is submitted
        saveBudgetType: function (event) {
            event.preventDefault();

            var budgetType = {
                title: this.refs.budgetType.value
            }

            formValidator.validateForm(budgetType);

            if (formValidator.isValid()) {
                if (this.props.params.id) {
                    this.props.actions.updateItem(resourceConstant.BUDGET_TYPES, budgetType, this.props.params.id);
                } else {
                    this.props.actions.addItem(resourceConstant.BUDGET_TYPES, budgetType);
                }
            } else {
                Toastr.error('Please fill the required fields with correct data.', 'Error!');
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
                    <EntityHeader header={(this.props.params.id)?'Edit Budget Type':'Add Budget Type'}
                                  routes={this.props.routes}/>
                    <div className="block">
                        <div
                            className="block-title-border">Budget Type Details
                        </div>
                        <form className="form-bordered" method="post" onSubmit={this.saveBudgetType}>
                            <div className="form-group">
                                <label>Budget Type *</label>
                                <input name="title" type="text" ref="budgetType" placeholder="Budget Type"
                                       className="form-control"
                                       value={this.props.selectedItem.budgetTypes.title}
                                       id="title"
                                       onBlur={formValidator.validateField}
                                       onFocus={formValidator.removeError.bind(null, 'title')}
                                       onChange={this.handleChange}/>
                                <span className="help-block"></span>
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
            actions: bindActionCreators(crudActions, dispatch)
        }
    };

    module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetTypeForm);

})();