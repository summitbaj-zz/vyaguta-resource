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
                suggestions: []
            }
        },


        changeTagState: function (data) {
            this.setState({suggestions: data});
            if(this.state.suggestions)
                this.displaySuggestionOption('block');
        },

        updateSuggestions: function (input) {
            this.setState({suggestions: []});
            this.displaySuggestionOption('none');
            ApiUtil.fetchByQuery(resourceConstant.TAGS, input, this.changeTagState);
        },

        displaySuggestionOption(value){
            document.getElementsByClassName(AUTOCOMPLETE_CLASS)[1].style.display = value;
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

        checkTagInSuggestion: function (input) {
            for (var i = 0; i < this.state.suggestions.length; i++) {
                if (input == this.state.suggestions[i].title) {
                    return this.state.suggestions[i];
                }
            }
            return {title: input};
        },

        enterKeyPressed: function () {
            var inputValue = this.refs.inputTag.value;

            if (inputValue) {
                var value = this.checkTagInSuggestion(inputValue);
                if (this.props.checkTag(value) === null && this.isValid(inputValue)) {
                    this.props.addNewTag(value);
                }
                this.refs.inputTag.value = '';
            }
            this.props.suggestions = [];
            this.displaySuggestionOption('none');
        },

        backSpacePressed: function () {
            var techStack = this.props.technologyStack;
            if (!this.refs.inputTag.value && techStack.length > 0) {
                this.props.removeTag(techStack[techStack.length - 1]);
            }
            this.props.suggestions = [];
            this.displaySuggestionOption('none');

        },

        renderTag: function (value) {
            return (
                <li className="newtag" key={value}>
                <span className="label label-blue-grey">
                    <label>{this.props.technologyStack[value].title}</label>
                    <i className="fa fa-close" onClick={this.props.removeTag.bind(null, this.props.technologyStack[value])}></i>
                </span>
                </li>
            );
        },

        getSuggestionTitle: function () {
            var titles = [];
            for(var i = 0; i < this.state.suggestions.length; i++){
                titles.push(this.state.suggestions[i].title);
            }
        return titles;
        },

        render: function () {
            var technologyStackIds = Object.keys(this.props.technologyStack);
            var suggestionTitle = this.getSuggestionTitle();
            return (
                <div
                    className="form-control tag-wrapper"
                    onClick={this.autoFocus}>
                    <ul id="tag-list" className="clearfix">
                        {technologyStackIds.map(this.renderTag)}

                        <li className="newtag-input"><input type="text" ref="inputTag" onKeyDown={this.inputTag}
                                                            className="input-tag" id="title" autoComplete="off"/>
                            <AutoComplete inputField="input-tag" suggestions={suggestionTitle}/>
                        </li>
                    </ul>
                </div>
            );
        }
    });
    module.exports = TechnologyStack;
})();
