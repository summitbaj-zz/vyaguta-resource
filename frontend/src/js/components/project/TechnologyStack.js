;(function () {
    'use-strict';

    var React = require('react');
    var ApiUtil = require('../../util/ApiUtil');
    var AutoComplete = require('./Autocomplete');
    var AUTOCOMPLETE_CLASS = 'autocomplete-suggestions';

    var resourceConstant = require('../../constants/resourceConstant');

    var TechnologyStack = React.createClass({
            getInitialState: function () {
                return {
                    technologyStack: [],
                    suggestions: []
                }
            },

            changeTagState: function (data) {
                this.setState({suggestions: data.names});
                document.getElementsByClassName(AUTOCOMPLETE_CLASS)[0].style.display = 'block';
            },

            updateSuggestions: function (input) {
                this.setState({suggestions: []});
                document.getElementsByClassName(AUTOCOMPLETE_CLASS)[0].style.display = 'none';
                ApiUtil.fetchByQuery(resourceConstant.TAGS, input, this.changeTagState);
            },

            autoFocus: function () {
                this.refs.inputTag.focus();
            },

            inputTag: function (event) {
                var techStack = this.props.technologyStack;
                var key = event.keyCode;

                if (key === 13) {
                    event.preventDefault();
                    this.enterKeyPressed();
                } else if (key === 8) {
                    this.backSpacePressed();
                } else if (key === 32 && !this.refs.inputTag.value) {
                    event.preventDefault();
                } else {
                    var inputValue = this.refs.inputTag.value;
                    var pressed = String.fromCharCode(key);

                    if (this.isValid(pressed)) {
                        inputValue += pressed;
                        this.updateSuggestions(inputValue.toLowerCase());
                    }
                }
            },

            isValid: function (pressed) {
                return (pressed.match(/[a-zA-Z0-9 .-]+/));

            },

            enterKeyPressed: function () {
                var inputValue = this.refs.inputTag.value;

                if (inputValue) {
                    if (this.props.checkTag(inputValue) === null && this.isValid(inputValue)) {
                        this.props.addNewTag(inputValue);
                    }
                    this.refs.inputTag.value = '';
                }
            },

            backSpacePressed: function () {
                var techStack = this.props.technologyStack;
                if (!this.refs.inputTag.value && techStack.length > 0) {
                    this.props.removeTag(techStack[techStack.length - 1]);
                }
            },

            renderTag: function (value) {
                return (
                    <li className="newtag" key={value}>
                <span className="label label-blue-grey">
                    <label>{value}</label>
                    <i className="fa fa-close" onClick={this.props.removeTag.bind(null, value)}></i>
                </span>
                    </li>
                );
            },

            render: function () {
                return (
                    <div
                        className="form-control tag-wrapper"
                        onClick={this.autoFocus}>
                        <ul id="tag-list" className="clearfix">
                            {this.props.technologyStack.map(this.renderTag)}

                            <li className="newtag-input"><input type="text" ref="inputTag" onKeyDown={this.inputTag}
                                                                className="input-tag" id="title"/>
                                <AutoComplete inputField="input-tag" suggestions={this.state.suggestions}/>
                            </li>
                        </ul>
                    </div>
                );
            }
        });
    module.exports = TechnologyStack;
})();
