;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');

    //components
    var BreadCrumb = require('../breadcrumb/BreadCrumb');

    var EntityHeader = React.createClass({
        render: function () {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section">
                                <h1>{this.props.header}</h1>
                                <span className="ajax-loader">
                                    <img src="img/ajax-loader.gif"/>
                                </span>
                            </div>
                        </div>
                        <BreadCrumb routes={this.props.routes}/>
                    </div>
                </div>
            );
        }
    });

    module.exports = EntityHeader;

})();

