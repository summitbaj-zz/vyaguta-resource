;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');
    var messageConstant = require('../../constants/messageConstant');

    //components
    var ApiUtil = require('../../util/apiUtil');
    var AutoComplete = require('../common/autocomplete/Autocomplete');


    var AccountManager = React.createClass({
        getInitialState: function () {
            return {
                suggestions: []
            }
        },

        changeSuggestionState: function (data) {

            this.setState({suggestions: data || []});

        },

        updateSuggestions: function (input) {
            this.setState({suggestions: []});

            ApiUtil.fetchByQuery(resourceConstant.TAGS, input, this.changeSuggestionState, 'any');
        },

        isValid: function (value) {
            return /^[a-zA-Z ]+$/.test(value);
        },

        getSuggestionName: function () {
            var names = [];
            for (var i = 0; i < this.state.suggestions.length; i++) {
                names.push(this.getAppendedName(i));
            }
            return names;
        },


        //temporary check from tag table until core in backend is fixed
        getAppendedName: function (index) {
            /*var name;
             var suggestions = this.state.suggestions;
             name = suggestions[index].firstName;
             if (suggestions[index].middleName) {
             name = name.concat(' ', suggestions[index].middleName);
             }
             name = name.concat(' ', suggestions[index].lastName);
             return name;*/
            return this.state.suggestions[index].title;
        },

        fetchNamesForValidation: function () {
            this.setState({suggestions: []});
            var input = this.refs.inputTag.value;
            ApiUtil.fetchByQuery(resourceConstant.TAGS, input, this.validateManager, 'any');
        },

        validateManager: function (data) {
            this.setState({suggestions: data || []});
            $('.manager-validation-icon').addClass('display-none');
            $('.manager-validation-icon').removeClass('display-inline');
            var input = this.refs.inputTag;
            if (input.value) {
                for (var i = 0; i < this.state.suggestions.length; i++) {
                    if (input.value === this.getAppendedName(i)) {
                        $('.manager-validation-icon').removeClass('display-none');
                        $('.manager-validation-icon').addClass('display-inline');
                        var accountManager = {'id': this.state.suggestions[i].id};
                        this.showValidity('has-success has-feedback', null, accountManager);
                        return;
                    }
                }
                this.showValidity('has-error', messageConstant.INVALID_ACCOUNT_MANAGER_MESSAGE, null);
            } else {
                this.showValidity(null, null, {});
            }
        },

        showValidity: function (className, message, accountManager) {
            var parentElement = $('#account-manager').parent().parent();
            parentElement.removeClass('has-error');
            parentElement.removeClass('has-success');
            parentElement.addClass(className);
            this.props.setManager(accountManager);
            this.refs.availableMessage.innerHTML = message;
        },

        removeMessage: function () {
            this.refs.availableMessage.innerHTML = '';
        },

        render: function () {
            var suggestionTitle = this.getSuggestionName();
            return (
                <div className="col-md-6 col-lg-4 element">
                    <label>Account Manager</label>
                    <div className="manager-parent">
                        <input type="text" placeholder="Account Manager Name" ref="inputTag" id="account-manager"
                               className="form-control manager-input" autoComplete="off"
                               onFocus={this.removeMessage}
                               onBlur={this.fetchNamesForValidation} id="account-manager"
                               onChange={this.props.fieldChange}
                        />
                         <span className="glyphicon glyphicon-ok form-control-feedback manager-validation-icon display-none"
                               aria-hidden="true"></span>

                        <AutoComplete inputField="manager-input" suggestions={suggestionTitle}
                                      generateSuggestions={this.updateSuggestions}/>
                        <span className="help-block" ref="availableMessage"></span>
                    </div>

                </div>
            );
        }
    });
    module.exports = AccountManager;
})
();