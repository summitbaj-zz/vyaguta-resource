/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 6/13/16.
 */

;(function () {
    'use strict';

    var React = require('react');

    var UserRoleMain = React.createClass({
        render : function () {
            return (
                <div id="page-content" className="page-content">
                    {this.props.children}
                </div>
            )
        }
    });

    module.exports = UserRoleMain;
})();