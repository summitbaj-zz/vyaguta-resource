;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //utils
    var dashboardUtil = require('../../../util/dashboardUtil');

    var Resource = React.createClass({
        render: function () {
            var resource = this.props.resource;
            return (
                <div className="row res-stats">
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            {resource.totalResource != null &&
                            <div className="widget-icon animation-fadeIn label-green pull-left"><span
                                className="res-counter">{resource.totalResource}</span></div>}
                            <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            {resource.freeResource != null &&
                            <div className="widget-icon animation-fadeIn pull-left label-red"><span
                                className="res-counter">{resource.freeResource}</span>
                            </div>}
                            <h3 className="widget-content text-right animation-pullDown"> Free Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            {resource.bookedResource &&
                            <div className="widget-icon animation-fadeIn pull-left label-lg-blue"><span
                                className="res-counter">{resource.bookedResource && resource.bookedResource.bookedResourceCount}</span>
                            </div>}
                            <h3 className="widget-content text-right animation-pullDown"> Booked Resource
                                <small className="side-text"><span
                                    className="text-light">{resource.bookedResource && 'Billed: ' + resource.bookedResource.billed + '(' + dashboardUtil.calculatePercentage(resource.bookedResource.billed, resource.bookedResource.bookedResourceCount) + ')'}</span> <span
                                    className="text-light">{resource.bookedResource && 'Unbilled: ' + resource.bookedResource.unbilled + '(' + dashboardUtil.calculatePercentage(resource.bookedResource.unbilled, resource.bookedResource.bookedResourceCount) + ')'}</span>
                                </small>
                            </h3>
                        </div>
                    </a></div>
                </div>
            );
        }
    });
    module.exports = Resource;
})();