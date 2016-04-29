/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    var SelectOption = React.createClass({
        render: function () {
            return (
                <option value={this.props.id}>{this.props.option}</option>
            )
        }
    });

    module.exports = SelectOption;
})();