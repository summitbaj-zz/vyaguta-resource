/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    var ProjectMain = React.createClass({
        render: function () {
            return (
                <div id="page-content" className="page-content">
                    {this.props.children}
                </div>
            );
        }
    });

    module.exports = ProjectMain;

})();
