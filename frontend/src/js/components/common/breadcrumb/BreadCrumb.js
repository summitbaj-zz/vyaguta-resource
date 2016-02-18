'use strict';

var React = require('react');

var BreadCrumb = React.createClass({
    render: function () {
        return(
            <ul className="breadcrumb breadcrumb-top">
                <li><a href="index.html">Home</a></li>
                <li><a href="project.html">Projects</a></li>
                <li>Add Projects</li>
            </ul>
        );
    }
});

module.exports = BreadCrumb;
