;(function () {
    'use strict';

    //React dependencies
    var React = require('react');

    //components
    var DropDownList = require('./DropDownList');
    var Hamburger = require('./Hamburger');
    var SearchBar = require('./SearchBar');

    var Header = React.createClass({

        render: function () {
            return (
                <header id="header" className="navbar navbar-default">
                    <Hamburger/>
                    <SearchBar/>
                    <DropDownList/>
                </header>
            )
        }
    });

    module.exports = Header;
})();
