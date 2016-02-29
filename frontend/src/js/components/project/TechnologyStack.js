var React = require('react');

var selectedIndex = -1;

var AutoComplete = require('./Autocomplete');

var TechnologyStack = React.createClass({

        autoFocus: function () {
            this.refs.inputTag.focus();
        },

        inputTag: function (event) {
           /* var inputValue = this.refs.inputTag.value;
            var techStack = this.props.technologyStack;
            var key = event.keyCode;

            if (this.props.suggestions && (key == 40 || key == 38)) {
                event.preventDefault();
                this.arrowKeyPressed(key);
            } else if (key == 13) {
                event.preventDefault();
                this.enterKeyPressed();
            } else if (key == 8) {
                this.backSpacePressed();
            } else if(key == 32 && !inputValue) {
                event.preventDefault();
            }else{
                var pressed = String.fromCharCode(key);
                var valid = pressed.match(/[a-zA-Z0-9 .-]+/);

                if (valid) {
                    inputValue = inputValue + pressed;
                    this.props.updateSuggestions(inputValue.toLowerCase());
                }
            }*/
        },
/*
        arrowKeyPressed: function (key) {
            if (key == 38) {
                if (selectedIndex == 0 || selectedIndex == -1) {
                    selectedIndex = suggestions.length - 1;
                } else {
                    selectedIndex -= 1;
                }
            } else {
                if (selectedIndex == suggestions.length - 1) {
                    selectedIndex = 0;
                } else {
                    selectedIndex += 1;
                }
            }
            this.removeHoverState();
            console.log(selectedIndex);
            suggestions[selectedIndex].className = 'suggestion hover';
        },

        removeHoverState: function () {
            for (var i = 0; i <= suggestions.length - 1; i++) {
                suggestions[i].className = 'suggestion';
            }
        },

        enterKeyPressed: function () {
            var inputValue = this.refs.inputTag.value;

            if (selectedIndex == -1 && inputValue) {
                if (this.props.checkTag(inputValue) == null) {
                    console.log(inputValue);
                    this.props.addNewTag(inputValue);
                }
                this.refs.inputTag.value = '';
            } else if (selectedIndex > -1) {
                this.refs.inputTag.value = this.props.suggestions[selectedIndex];
                selectedIndex = -1;
                this.removeHoverState(suggestions);
            }
            this.refs.suggestions.style.display = 'none';
        },

        backSpacePressed: function () {
            var techStack = this.props.technologyStack;
            if (!this.refs.inputTag.value && techStack.length > 0) {
                this.props.removeTag(techStack[techStack.length - 1]);
            }
        },*/

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






        focusOut: function () {
            this.refs.suggestions.style.display = 'none';
            selectedIndex = -1;
            this.removeHoverState(suggestions);

        }
        ,
        render: function () {

            return (
                <div
                    className="form-control tag-wrapper"
                    onClick={this.autoFocus}>
                    <ul id="tag-list" className="clearfix">
                        {this.props.technologyStack.map(this.renderTag)}
                        <li className="newtag-input"><input type="text" ref="inputTag" onKeyDown={this.inputTag}
                                                            onBlur={this.focusOut}
                                                            className="input-tag"/>
                           <AutoComplete input={this.refs.inputTag} suggestions={this.props.suggestions}/>
                        </li>
                    </ul>
                </div>
            );
        }

    })
    ;
module.exports = TechnologyStack;