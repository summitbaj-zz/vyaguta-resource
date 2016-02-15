;(function () {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom'),
        DropDownList = require('./dropdown_list'),
        Hamburger = require('./hamburger'),
        SearchBar = require('./search_bar');

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
