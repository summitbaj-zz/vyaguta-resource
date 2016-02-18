/**
 * Created by pratishshr on 2/15/16.
 */

var React = require('react');
var IndexLink = require('react-router').IndexLink;
var BudgetHeader = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="content-header">
                        <div className="header-section">
                            <h1>{this.props.title}</h1>
                        </div>
                    </div>
                    <ul className="breadcrumb breadcrumb-top">
                        <li><IndexLink to="/">Home</IndexLink></li>
                        <li>Budget Types</li>
                    </ul>
                </div>
            </div>
        )
    }
});

module.exports = BudgetHeader;
