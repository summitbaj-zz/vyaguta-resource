;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //components
    var Tagging = require('../../common/tag/Tagging');
    var resourceConstants = require('../../../constants/resourceConstants');

    //services
    var resourceApiService = require('../../../services/api-services/resourceApiService');

    var TechnologyStack = React.createClass({
        getInitialState: function () {
            return {
                tags: [],
                suggestions: [],
                isRequesting: false
            }
        },

        componentWillReceiveProps: function (nextProps) {
            this.setState({tags: this.getTitle(nextProps.technologyStack)});
        },

        getTitle: function (tags) {
            var tag = [];
            var technologyStack = tags || [];
            for (var i = 0; i < technologyStack.length; i++) {
                tag[i] = {id: technologyStack[i].id, title: technologyStack[i].title};
            }
            return tag;
        },

        updateSuggestions: function (input) {
            var that = this;
            that.setState({isRequesting: true});

            resourceApiService.fetch(resourceConstants.TAGS, {q: input}).then(function (response) {
                    that.setState({isRequesting: false});
                    that.setState({suggestions: response.body.data});
                },
                function (error) {
                    that.setState({isRequesting: false});
                });
        },

        addTag: function (tag) {
            this.setState({isRequesting: false});
            this.props.addTag({title: tag});
        },

        render: function () {
            var suggestionTitles = this.getTitle(this.state.suggestions);
            return (
                <Tagging tags={this.state.tags} suggestions={suggestionTitles}
                         removeTag={this.props.removeTag} addTag={this.addTag}
                         updateSuggestions={this.updateSuggestions} isRequesting={this.state.isRequesting}/>
            );
        }
    });

    module.exports = TechnologyStack;

})();