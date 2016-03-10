;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //components
    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');

    var ProjectTypeHeader = React.createClass({
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

    module.exports = ProjectTypeHeader;

})();

