/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/14/16.
 */

;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    //components
    var d3Chart = require('./d3Chart');
    var ApiUtil = require('../ApiUtil');
    var ReactDOM = require('react-dom');

    var SwimLaneChart = React.createClass({
        componentDidMount: function () {
            //temporary data until backend is complete

            var element = ReactDOM.findDOMNode(this);
            var width = this.props.width;

            ApiUtil.fetchAll('timeLineData').then(function (response) {
                d3Chart.create(element, {'width': width}, response.body);
            }, function (error) {
                console.log('error');
            });
        },

        render: function () {
            return (
                <div id="swimlaneChart">
                </div>
            )
        }
    });

    module.exports = SwimLaneChart;
})();