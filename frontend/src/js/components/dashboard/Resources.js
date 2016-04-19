;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var Resources = React.createClass({
        render: function () {
            return (
                <div className="row res-stats">
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn label-green pull-left"><span
                                className="res-counter">100</span></div>
                            <h3 className="widget-content text-right animation-pullDown"> Total Resource </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn pull-left label-red"><span
                                className="res-counter">30</span>
                            </div>
                            <h3 className="widget-content text-right animation-pullDown"> Free Resources </h3>
                        </div>
                    </a></div>
                    <div className="col-sm-6 col-lg-4"><a className="widget widget-hover-effect1">
                        <div className="widget-simple">
                            <div className="widget-icon animation-fadeIn pull-left label-lg-blue"><span
                                className="res-counter">70</span></div>
                            <h3 className="widget-content text-right animation-pullDown"> Booked Resources
                                <small className="side-text"><span
                                    className="text-light">Billed: 60 (86%)</span> <span
                                    className="text-light">Unbilled: 10 (14%)</span></small>
                            </h3>
                        </div>
                    </a></div>
                </div>
            );
        }
    });
    module.exports = Resources;
})();