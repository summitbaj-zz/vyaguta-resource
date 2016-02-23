;(function () {
    'use strict';

    var React = require('react');
    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');

    var ProjectStatusHeader = React.createClass({
        render: function () {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section">
                                <h1>{this.props.header}</h1>
                            </div>
                        </div>
                        <BreadCrumb routes={this.props.routes}/>
                    </div>
                </div>
            );
        }
    });

    module.exports = ProjectStatusHeader;

})();

