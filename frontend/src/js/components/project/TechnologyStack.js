;(function () {
    'use-strict';

    var React = require('react');
    var ApiUtil = require('../../util/ApiUtil');

    var TechnologyStack = React.createClass({
        componentDidMount: function(){},

        changeTagState: function (data) {
            this.setState({suggestions: data});
        },

        updateSuggestions: function (input) {
            this.setState({suggestions: []});
            ApiUtil.fetchByQuery(input, this.changeTagState);
        },

        render: function(){
            return(
                <Tagging technologyStack={this.props.technologyStack}
                         removeTag={this.props.removeTag} addNewTag={this.props.addNewTag} updateSuggestions={this.updateSuggestions}/>
            );
        }
    });
    module.exports = TechnologyStack;
})();