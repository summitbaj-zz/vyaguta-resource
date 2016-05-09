;(function () {
    'use strict';

    //React Dependencies
    var React = require("react");

    var SearchBar = React.createClass({
        render: function () {
            return (
                <form action="page_ready_search_results.html" method="post" className="navbar-form-custom"
                      role="search">
                    <div className="form-group">
                        <input type="text" id="top-search" name="top-search" className="form-control"
                               placeholder="Search.."/>
                    </div>
                </form>
            );
        }
    });

    module.exports = SearchBar;

})();
