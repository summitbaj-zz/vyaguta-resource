;(function () {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom'),
        DropDownList = require('./DropDownList'),
        Hamburger = require('./Hamburger'),
        SearchBar = require('./SearchBar'),
        ErrorMessage = require('../error-message/ErrorMessage');

    var Header = React.createClass({

        render: function () {
            return (
                <header className="navbar navbar-default">
                    <Hamburger/>
                    <SearchBar/>
                    <DropDownList/>
                </header>
            )
        }
    });

    module.exports = Header;
})();
