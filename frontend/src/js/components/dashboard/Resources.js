;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var Resources = React.createClass({
        render: function () {
            var resources = this.props.resources;
            console.log(resources);
            return (
                <div className="row res-stats">
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn label-green pull-left"><span
                                className="res-counter">{resources.totalResources}</span></div>
                            <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn pull-left label-red"><span
                                className="res-counter">{resources.freeResources}</span>
                            </div>
                            <h3 className="widget-content text-right animation-pullDown"> Free Resources </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn pull-left label-lg-blue"><span
                                className="res-counter">{resources.bookedResources}</span></div>
                            <h3 className="widget-content text-right animation-pullDown"> Booked Resources
                                <small className="side-text"><span
                                    className="text-light">Billed: {resources.billed}</span> <span
                                    className="text-light">Unbilled: {resources.unbilled}</span></small>
                            </h3>
                        </div>
                    </a></div>
                </div>
            );
        }
    });
    module.exports = Resources;
})();