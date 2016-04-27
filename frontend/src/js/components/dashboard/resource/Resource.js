;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var Resource = React.createClass({
        getPercentage: function (number) {
            return Math.round((number / this.props.resource.bookedResource.bookedResourceCount * 100) * 100) / 100;
        },
        render: function () {
            var resource = this.props.resource;
            return (
                <div className="row res-stats">
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            {resource.totalResource && <div className="widget-icon animation-fadeIn label-green pull-left"><span
                                className="res-counter">{resource.totalResource}</span></div>}
                            <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            {resource.freeResource && <div className="widget-icon animation-fadeIn pull-left label-red"><span
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
                                    className="text-light">{resource.bookedResource && 'Billed: ' + resource.bookedResource.billed + '(' + this.getPercentage(resource.bookedResource.billed) + '%)'}</span> <span
                                    className="text-light">{resource.bookedResource && 'Unbilled: ' + resource.bookedResource.unbilled + '(' + this.getPercentage(resource.bookedResource.unbilled) + '%)'}</span>
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