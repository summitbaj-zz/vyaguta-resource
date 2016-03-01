/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use-strict';
    var React = require('react');

    var SelectOption = React.createClass({
        render: function () {
            return (
                <option value={this.props.entity.id}>{this.props.entity.title}</option>
            )
        }
    });

    module.exports = SelectOption;
})();