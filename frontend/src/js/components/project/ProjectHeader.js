/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use strict';

    var React = require('react');
    var BreadCrumb = require('../common/breadcrumb/BreadCrumb');

    var ProjectHeader = React.createClass({
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

    module.exports = ProjectHeader;
<<<<<<< HEAD
})();
=======

})();

>>>>>>> 988f434ce3f20636d0df881d31f80d5c0fcf41dd
