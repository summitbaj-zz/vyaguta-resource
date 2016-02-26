/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {
    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');
    var React = require('react');
    var IndexLink = require('react-router').IndexLink;


    var BudgetTypeHeader = React.createClass({
        render: function () {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section">
                                <h1>{this.props.title}</h1>
                                <span className="ajax-loader">
                                    <img src="/dist/img/ajax-loader.gif"/>
                                </span>
                            </div>
                        </div>
                        <BreadCrumb routes={this.props.routes}/>
                    </div>
                </div>
            )
        }
    });

    module.exports = BudgetTypeHeader;

})();
