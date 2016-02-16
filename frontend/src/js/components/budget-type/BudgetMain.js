/**
 * Created by pratishshr on 2/15/16.
 */

'use strict';

var React = require('react');
var BudgetMain = React.createClass({

    render: function () {
        return (
            <div id="page-content">
                {this.props.children}
            </div>
        )
    }
});

module.exports = BudgetMain;