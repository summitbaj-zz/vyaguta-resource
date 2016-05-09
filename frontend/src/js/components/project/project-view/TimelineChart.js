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
    var d3Chart = require('../../../utils/charts/d3Chart');
    var ApiUtil = require('../../../utils/apiUtil');
    var ReactDOM = require('react-dom');

    //services
    var convertContractHash = require('../../../services/convertContractHash');

    var isDrawn = false;

    var TimelineChart = React.createClass({
        drawChart: function (data) {
            if (data && data.length && !isDrawn && this.isContractMemberPresent(data)) {
                var element = $('#timelineChart')[0];
                var data = convertContractHash.toTimelineHash(data);
                d3Chart.create(element, data);
                isDrawn = true;
            }
        },

        isContractMemberPresent: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].contractMembers.length) {
                    return true;
                }
            }
            return false;
        },

        componentWillUnmount: function () {
            isDrawn = false;
        },

        render: function () {
            this.drawChart(this.props.data);
            return (
                <div className="col-sm-12">
                    <div className="block full">
                        <div className="block-title">
                            <h2>Timeline</h2>
                        </div>
                        <div className="block-content">
                            <div id="timelineChart">
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

    module.exports = TimelineChart;

})();