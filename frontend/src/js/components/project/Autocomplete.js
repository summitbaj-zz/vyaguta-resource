var React = require('react');
var suggestions = document.getElementsByClassName('suggestion');

var AutoComplete = React.createClass({
    
   componentDidMount(){
       var abc = document.getElementsByClassName('')
       this.props.input.addEventListener('onkeydown', this.keyPressed);
   },
    keyPressed: function(){
        console.log('bish');
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