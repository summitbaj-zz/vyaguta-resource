;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //constants
    var resourceConstant = require('../../constants/resourceConstant');

    //components
    var ApiUtil = require('../../util/ApiUtil');
    var AutoComplete = require('./Autocomplete');


    var AccountManager = React.createClass({
            getInitialState: function () {
                return {
                    suggestions: []
                }
            },

            changeSuggestionState: function (data) {
                this.setState({suggestions: data});
            },

            updateSuggestions: function (input) {
                this.setState({suggestions: []});
                ApiUtil.fetchByQuery(resourceConstant.ACCOUNT_MANAGERS, input, this.changeSuggestionState);
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
                for (var i = 0; i < this.state.suggestions.length; i++) {
                    if (input.value === this.getAppendedName(i)) {
                        input.parentElement.parentElement.className = 'col-md-6 col-lg-4 element has-success';
                        this.props.setManager({'id': this.state.suggestions[i].id});
                        this.refs.availableMessage.innerHTML = 'Valid name';
                        return;
                    }
                }
                input.parentElement.parentElement.className += ' has-error';
                this.props.setManager(null);
                this.refs.availableMessage.innerHTML = 'Invalid name';
            },

            render: function () {
                var suggestionTitle = this.getSuggestionName();
                return (
                    <div className="col-md-6 col-lg-4 element">
                        <label className="control-label">Account Manager</label>
                        <div className="manager-parent">
                            <input type="text" placeholder="Account Manager Name" ref="inputTag"
                                   className="form-control manager-input" autoComplete="off" onKeyUp={this.input}
                                   onBlur={this.validateManager} id="account-manager"/>
                            <AutoComplete inputField="manager-input" suggestions={suggestionTitle}/>
                        </div>
                        <span className="help-block" ref="availableMessage"></span>
                    </div>
                );
            }
        })
        ;
    module.exports = AccountManager;
})
();