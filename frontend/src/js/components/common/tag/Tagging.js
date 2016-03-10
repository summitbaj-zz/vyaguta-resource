;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //constants
    var resourceConstant = require('../../../constants/resourceConstant');

    //components
    var AutoComplete = require('../autocomplete/Autocomplete');

    var Tagging = React.createClass({
        autoFocus: function () {
            this.refs.inputTag.focus();
        },

        inputKey: function (event) {
            var techStack = this.props.technologyStack;
            var key = event.keyCode;

            if (key === 13) {
                event.preventDefault();
                this.insertTag();
            } else if (key === 8) {
                this.deleteTag();
            } else if (key === 32 && !this.refs.inputTag.value) {
                event.preventDefault();
            }
        },

        isValid: function (pressed) {
            return (pressed.match(/[\x20-\x7E]+/g));
        },

        checkTag: function (value) {
            var tags = this.props.tags;
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].toLowerCase() == value.toLowerCase()) {
                    return i;
                }
            }
            return null;
        },

        insertTag: function () {
            var inputValue = this.refs.inputTag.value;
            if (inputValue) {
                if (this.checkTag(inputValue) === null && this.isValid(inputValue)) {
                    this.props.addTag(inputValue);
                }
                this.refs.inputTag.value = '';
                this.refs.inputTag.focus();
            }
        },

        generateSuggestions: function (event) {
            var pressed = String.fromCharCode(event.keyCode);
            var inputValue = this.refs.inputTag.value;
            if ((event.keyCode > 47 && event.keyCode < 112) || (event.keyCode > 185) || (event.keyCode === 8 || event.keyCode === 46 && inputValue)) {
                this.props.updateSuggestions(inputValue.toLowerCase());
            }
        },

        deleteTag: function () {
            var tags = this.props.tags;
            if (!this.refs.inputTag.value && tags.length > 0) {
                this.props.removeTag(tags.length - 1);
            }
        },

        focusOut: function(){
            this.insertTag();
        },

        renderTag: function (key) {
            return (
                <li className="newtag" key={key}>
                    <span className="label label-blue-grey">
                        <label>{this.props.tags[key]}</label>
                        <i className="fa fa-close" onClick={this.props.removeTag.bind(null, key)}></i>
                    </span>
                </li>
            );
        },

        render: function () {
           var tagIds = Object.keys(this.props.tags);
            return (
                <div
                    className="form-control tag-wrapper"
                    onClick={this.autoFocus}>
                    <ul id="tag-list" className="clearfix">
                        {tagIds.map(this.renderTag)}

                        <li className="newtag-input">
                            <input type="text" ref="inputTag" onKeyDown={this.inputKey}
                                                            onKeyUp={this.generateSuggestions} onBlur={this.focusOut}
                                                            className="input-tag" id="title" autoComplete="off"/>
                            <AutoComplete inputField="input-tag" suggestions={this.props.suggestions}/>
                        </li>
                    </ul>
                </div>
            );
        }
    });
    module.exports = Tagging;
})();
