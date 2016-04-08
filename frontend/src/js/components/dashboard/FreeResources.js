;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var FreeResources = React.createClass({
        showFreeResources: function () {
            var totalData = this.props.resources && this.props.resources.length;
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
                resourceArray.push(this.renderResources(i * 16 + j));
            }
            return (
                <div className={className}>{resourceArray}</div>
            );
        },

        renderResources: function (index) {
            if (index < this.props.resources.length) {
                var resource = this.props.resources[index];
                return (
                    <div className="col-xs-12 col-lg-3">
                        <a className="widget widget-hover-effect1">
                            <div className="widget-simple widget-custom">
                                <div className="cards">
                                    <h3 className="widget-content text-center animation-pullDown">{resource.name}</h3>
                                    <span className="cards-counts">{resource.allocation}</span>
                                    <span className="cards-text">{resource.post}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                );
            }
        },

        renderCarouselIndicator: function () {
            var indicators = [];
            var totalData = this.props.resources && this.props.resources.length;
            var className;
            for (var i = 0; i < Math.ceil(totalData / 16); i++) {
                (i == 0) ? className = 'active' : className = '';
                indicators.push(<li data-target="#myCarousel" data-slide-to={i}
                                    className={className}></li>);
            }
            return (<ol className="carousel-indicators">{indicators}</ol>)
        },

        render: function () {
            if (this.props.resources && this.props.resources.length > 0) {
                return (
                    <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="false">
                        {this.showFreeResources()}
                        {this.renderCarouselIndicator()}
                        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                )
                    ;
            } else {
                return (
                    <div className="not-found-message">No resources are available at the moment.</div>
                );
            }
        }
    });
    module.exports = FreeResources;
})();
