/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //components
    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');

    var ProjectHeader = React.createClass({
        render: function () {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section">
                                <h1>{this.props.title}</h1>
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

    module.exports = ProjectHeader;
})();
