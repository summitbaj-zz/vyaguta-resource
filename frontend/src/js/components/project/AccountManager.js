;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');

    //components
    var ApiUtil = require('../../util/ApiUtil');
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
            ApiUtil.fetchAllFromCore(resourceConstant.EMPLOYEES, this.changeSuggestionState);
        },

        input: function (event) {
            var key = event.keyCode;

            if (key == 13) {
                event.preventDefault();
            } else {
                var inputValue = this.refs.inputTag.value;
                var pressed = String.fromCharCode(key);

                if (this.isValid(pressed)) {
                    this.updateSuggestions(inputValue.toLowerCase());
                }

            }
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

        getAppendedName: function (index) {
            var name;
            var suggestions = this.state.suggestions;
            name = suggestions[index].firstName;
            if (suggestions[index].middleName) {
                name = name.concat(' ', suggestions[index].middleName);
            }
            name = name.concat(' ', suggestions[index].lastName);
            return name;
        },

        validateManager: function () {
            var input = this.refs.inputTag;
            if (input.value) {
                for (var i = 0; i < this.state.suggestions.length; i++) {
                    if (input.value === this.getAppendedName(i)) {
                        var accountManager = {'id': this.state.suggestions[i].id};
                        this.showValidity('has-success', '', accountManager);
                        this.setState({suggestions: []});
                        return;
                    }
                }
                this.showValidity('has-error', 'Invalid name', null);
            } else {
                this.showValidity('', '', {});
            }
            this.setState({suggestions: []});
        },

        showValidity: function (className, message, accountManager) {
            var parentElement = $('#account-manager').parent();
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
                    <label className="control-label">Account Manager</label>
                    <div className="manager-parent">
                        <input type="text" placeholder="Account Manager Name" ref="inputTag" id="account-manager"
                               className="form-control manager-input" autoComplete="off" onKeyUp={this.input}
                               onFocus={this.removeMessage}
                               onBlur={this.validateManager} id="account-manager" onChange={this.props.fieldChange}/>
                        <AutoComplete inputField="manager-input" suggestions={suggestionTitle}/>
                        <span className="help-block" ref="availableMessage"></span>
                    </div>

                </div>
            );
        }
    });
    module.exports = AccountManager;
})
();