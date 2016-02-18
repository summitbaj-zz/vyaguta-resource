;(function () {
    'use strict';

    var React = require('react');
    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');

    var Header = React.createClass({
        render: function () {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section">
                                <h1>{this.props.header}</h1>
                            </div>
                        </div>
                        <BreadCrumb/>
                    </div>
                </div>
            );
        }
    });

    module.exports = Header;
})();

