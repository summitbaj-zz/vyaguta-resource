/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;
    var bindActionCreators = require('redux').bindActionCreators;

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var urlConstant = require('../../constants/urlConstant');

    //components
    var BudgetTypeHeader = require('./BudgetTypeHeader');
    var formValidator = require('../../util/FormValidator');
    var crudActions = require('../../actions/crudActions');

    var BudgetTypeForm = React.createClass({
        componentDidMount: function () {
            //fill form with data for editing
            if (this.props.params.id) {
                this.props.actions.fetchById(resourceConstant.BUDGET_TYPES, this.props.params.id);
            }
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
                this.showErrors(formValidator.errors)
            }
        },


        //call when validation fails
        showErrors: function (errors) {
            for (var elementId in errors) {
                var parentElement = document.querySelector('#' + elementId).parentElement;

                parentElement.className += " has-error";
                parentElement.querySelector('span').innerHTML = errors[elementId];
            }
        },

        //handle change over every key press in the input fields
        handleChange: function (event) {
            var key = event.target.name;
            var value = event.target.value;

            this.props.actions.updateSelectedItem(key, value);
        },

        render: function () {
            return (
                <div>
                    <BudgetTypeHeader title={(this.props.params.id)?'Edit Budget Type':'Add Budget Type'}
                                      routes={this.props.routes}/>
                    <div className="block">
                        <div
                            className="block-title-border">Budget Type Details
                        </div>
                        <form className="form-bordered" method="post" onSubmit={this.saveBudgetType}>
                            <div className="form-group">
                                <label>Budget Type</label>
                                <input name="title" type="text" ref="budgetType" placeholder="Budget Type"
                                       className="form-control"
                                       value={this.props.selectedItem.budgetTypes.title}
                                       id="title"
                                       onChange={this.handleChange}/>
                                <span className="help-block"></span>
                            </div>
                            <div className="form-group form-actions clearfix">
                                <div className="pull-right">
                                    <button className="btn btn-sm btn-success" type="submit" id="save-btn"><i
                                        className="fa fa-angle-right"></i>{(this.props.params.id) ? 'Update' : 'Save'}
                                    </button>
                                    <button className="btn btn-sm btn-default" type="reset"><i
                                        className="fa fa-repeat"></i>Reset
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