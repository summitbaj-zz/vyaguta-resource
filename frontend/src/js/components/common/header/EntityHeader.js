;(function () {
    'use strict';

    //React and Redux dependencies
    var React = require('react');
    var connect = require('react-redux').connect;

    //components
    var BreadCrumb = require('../breadcrumb/BreadCrumb');

    //libraries
    var NProgress = require('nprogress');
    var DocumentTitle = require('react-document-title');

    NProgress.configure({
        showSpinner: false,
        speed: 400,
        minimum: 0.3
    });

    var EntityHeader = React.createClass({
        componentWillReceiveProps: function (props) {
            props.apiState.isRequesting ? NProgress.start() : NProgress.done();
        },

        render: function () {
            return (
                <DocumentTitle title={this.props.title || 'Vyaguta-resource'}>
                    <div className="row header-margin">
                        <div className="col-lg-12">
                            <div className="content-header">
                                <div className="header-section clearfix">
                                    <h1>{this.props.header}</h1>
                                </div>
                            </div>
                            <BreadCrumb routes={this.props.routes}/>
                        </div>
                    </div>
                </DocumentTitle>
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

