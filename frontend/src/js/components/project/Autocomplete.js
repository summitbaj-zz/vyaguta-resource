var React = require('react');
var suggestions = document.getElementsByClassName('suggestion');
var selectedIndex = -1;
var input;

var AutoComplete = React.createClass({

    componentDidMount: function () {
        input = document.getElementsByClassName(this.props.inputField)[0]
        input.addEventListener('keydown', this.keyPressed);
        input.addEventListener('blur', this.focusOut);
    },

    focusOut: function () {
        this.refs.suggestions.style.display = 'none';
        selectedIndex = -1;
    },

    keyPressed: function () {
        var key = event.keyCode;
        if (this.props.suggestions && (key == 40 || key == 38)) {
            event.preventDefault();
            this.arrowKeyPressed(key);
        } else if (key == 13) {
            event.preventDefault();
            this.enterKeyPressed();
        }
    },

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
        suggestions[selectedIndex].className = 'suggestion hover';
    },

    removeHoverState: function () {
        for (var i = 0; i <= suggestions.length - 1; i++) {
            suggestions[i].className = 'suggestion';
        }
    },

    enterKeyPressed: function () {
        if (selectedIndex > -1) {
            input.value = this.props.suggestions[selectedIndex];
            selectedIndex = -1;
            this.removeHoverState(suggestions);
        }
        this.refs.suggestions.style.display = 'none';
        selectedIndex = -1;
    },

    listSuggestions: function (value) {
        return (
            <div className='suggestion' key={value}
                 onClick={this.suggestionClicked.bind(null, value)}
                 onMouseOver={this.suggestionHovered.bind(null, value)}>{this.props.suggestions[value]}</div>
        );
    },

    suggestionClicked: function (value) {
        this.refs.inputTag.value = value;
    },

    suggestionHovered: function (key) {
        this.removeHoverState(suggestions);
        selectedIndex = parseInt(key);
        suggestions[selectedIndex].className = 'suggestion hover';
    },


    render: function () {
        var suggestionId = Object.keys(this.props.suggestions);
        return (
            <div className="autocomplete-suggestions" ref="suggestions">
                {suggestionId.map(this.listSuggestions)}
            </div>

        )
    }
});
module.exports = AutoComplete;