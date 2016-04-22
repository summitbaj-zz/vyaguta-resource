;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var Resource = React.createClass({
        getPercentage: function (number) {
            return Math.round((number / this.props.resource.bookedResources.bookedResourceCount * 100) * 100) / 100;
        },
        render: function () {
            var resource = this.props.resource;
            return (
                <div className="row res-stats">
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn label-green pull-left"><span
                                className="res-counter">{resource.totalResources}</span></div>
                            <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn pull-left label-red"><span
                                className="res-counter">{resource.freeResources}</span>
                            </div>
                            <h3 className="widget-content text-right animation-pullDown"> Free Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn pull-left label-lg-blue"><span
                                className="res-counter">{resource.bookedResources && resource.bookedResources.bookedResourceCount}</span>
                            </div>
                            <h3 className="widget-content text-right animation-pullDown"> Booked Resources
                                <small className="side-text"><span
                                    className="text-light">Billed: {resource.bookedResources && resource.bookedResources.billed + '(' + this.getPercentage(resource.bookedResources.billed) + '%)'}</span> <span
                                    className="text-light">Unbilled: {resource.bookedResources && resource.bookedResources.unbilled + '(' + this.getPercentage(resource.bookedResources.unbilled) + '%)'}</span>
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