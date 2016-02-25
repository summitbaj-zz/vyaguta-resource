/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {

    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');
    var React = require('react');
    var IndexLink = require('react-router').IndexLink;

    var ProjectHeader = React.createClass({
        render: function () {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section">
                                <h1>{this.props.title}</h1>
                            </div>
                        </div>
                        <BreadCrumb routes={this.props.routes}/>
                    </div>
                </div>
            )
        }
    });

    module.exports = ProjectHeader;
})();
