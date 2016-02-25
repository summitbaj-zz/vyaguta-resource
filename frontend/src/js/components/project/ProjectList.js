/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/25/16.
 */

;(function () {
    var React = require('react');
    var Link = require('react-router').Link
    var ProjectList = React.createClass({
        render: function () {
            return (
                <div>
                    <Link to = "projects/new"> Add Project </Link>
                </div>
            );
        }
    });

    module.exports = ProjectList;

})();