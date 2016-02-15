;(function () {
    'use strict';

    var React = require("react");
    var ReactDOM = require("react-dom");
    var DropDownList = require("./dropdown_list");
    var Hamburger = require("./hamburger");
    var SearchBar = require("./search_bar");

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
