;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //component
    var FreeResourceItem = require('./FreeResourceItem');

    var FreeResource = React.createClass({
        showFreeResource: function () {
            var totalData = this.props.resource && this.props.resource.length;
            var carousalArray = [];

            for (var i = 0; i < Math.ceil(totalData / 16); i++) {
                carousalArray.push(this.renderCarousal(i));
            }
            return (<div className="carousel-inner" role="listbox">{carousalArray}</div>);
        },

        renderCarousal: function (i) {
            var className = (i == 0) ? 'item active' : 'item';
            var resourceArray = [];
            for (var j = 0; j < 16; j++) {
                resourceArray.push(this.renderResource(i * 16 + j));
            }
            return (
                <div className={className} key={'resource' + i}>{resourceArray}</div>
            );
        },

        renderResource: function (index) {
            if (index < this.props.resource.length) {
                return (
                    <FreeResourceItem key={index} resource={this.props.resource[index]}/>
                );
            }
        },

        renderCarouselIndicator: function () {
            var indicators = [];
            var totalData = this.props.resource && this.props.resource.length;
            var className;
            for (var i = 0; i < Math.ceil(totalData / 16); i++) {
                (i == 0) ? className = 'active' : className = '';
                indicators.push(<li data-target="#myCarousel" data-slide-to={i}
                                    className={className} key={'indicator' + i}></li>);
            }
            return (<ol className="carousel-indicators">{indicators}</ol>)
        },

        render: function () {
            if (this.props.resource && this.props.resource.length > 0) {
                return (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="widget">
                                <div className="widget-extra widget-custom">
                                    <div className="widget-title">Available Resource</div>
                                </div>
                                <div className="widget-extra-full">
                                    <div className="row">
                                        <div id="myCarousel" className="carousel slide" data-ride="carousel"
                                             data-interval="false">
                                            {this.showFreeResource()}
                                            {this.renderCarouselIndicator()}
                                            <a className="left carousel-control" href="#myCarousel" role="button"
                                               data-slide="prev">
                                                <span className="glyphicon glyphicon-chevron-left"
                                                      aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="right carousel-control" href="#myCarousel" role="button"
                                               data-slide="next">
                                                <span className="glyphicon glyphicon-chevron-right"
                                                      aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="widget">
                                <div className="widget-extra widget-custom">
                                    <div className="widget-title">Available Resource</div>
                                </div>
                                <div className="not-found-message">No resource is available at the moment.</div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    });
    module.exports = FreeResource;
})();
