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
    var ApiUtil = require('../apiUtil');
    var ReactDOM = require('react-dom');

    var SwimLaneChart = React.createClass({
        componentDidMount: function () {
            //temporary data until backend is complete

            var element = ReactDOM.findDOMNode(this);
            var width = this.props.width;

            //ApiUtil.fetchAll('timeLineData').then(function (response) {
            //    d3Chart.create(element, {'width': width}, response.body);
            //}, function (error) {
            //    console.log('error');
            //});
            var data ={    "lanes": [
                {
                    "id": 0,
                    "label": "Pratish"
                },
                {
                    "id": 1,
                    "label": "Anuj"
                },
                {
                    "id": 2,
                    "label": "Achyut"
                },
                {
                    "id": 3,
                    "label": "Bishal"
                },
                {
                    "id": 4,
                    "label": "Kailash"
                }
            ],
                "items": [
                    {
                        "id": 100,
                        "lane": 0,
                        "start": "2016-02-01",
                        "end": "2016-05-16",
                        "class": "past",
                        "desc": "This is a description."
                    },
                    {
                        "id": 50,
                        "lane": 4,
                        "start": "2015-10-08",
                        "end": "2015-11-08",
                        "class": "past",
                        "desc": "This is a description."
                    },
                    {
                        "id": 25,
                        "lane": 2,
                        "start": "2016-01-01",
                        "end": "2016-01-10",
                        "class": "past",
                        "desc": "This is a description."
                    },
                    {
                        "id": 80,
                        "lane": 3,
                        "start": "2015-12-07",
                        "end": "2015-12-20",
                        "class": "past",
                        "desc": "This is a description."
                    },
                    {
                        "id": 1,
                        "lane": 4,
                        "start": "2015-08-08",
                        "end": "2015-09-08",
                        "class": "past",
                        "desc": "This is a description."
                    }
                ]};
            d3Chart.create(element, {'width': width}, data);

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