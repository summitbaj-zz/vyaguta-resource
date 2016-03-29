;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;

    //components
    var BreadCrumb = require('../breadcrumb/BreadCrumb');

    var EntityHeader = React.createClass({
        render: function () {
            return (
                <div className="row header-margin">
                    <div className="col-lg-12">
                        <div className="content-header">
                            <div className="header-section clearfix">
                                <h1>{this.props.header}</h1>
                                <span className="ajax-loader">
                                    {this.props.apiState.isRequesting &&
                                        <img src="img/ajax-loader.gif"/>
                                    }
                                </span>
                            </div>
                        </div>
                        <BreadCrumb routes={this.props.routes}/>
                    </div>
                </div>
            );
        }
    });

    var mapStateToProps = function (state) {
        return {
            apiState: state.apiReducer
        }
    };

    module.exports = connect(mapStateToProps)(EntityHeader);

})();

