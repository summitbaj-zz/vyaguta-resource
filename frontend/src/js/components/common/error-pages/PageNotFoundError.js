/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/10/16.
 */

;(function () {

    //React dependencies
    var React = require('react');
    //React dependencies
    var browserHistory = require('react-router').browserHistory;

    //libraries
    var NProgress = require('nprogress');
    var DocumentTitle = require('react-document-title');

    var PageNotFoundError = React.createClass({
        componentDidMount: function () {
            NProgress.done();
        },

        render: function () {
            var requestedPage = window.location.href;
            return (
                <DocumentTitle title='Not Found'>
                    <div className="error">
                        <div className="error-code m-b-10 m-t-20">404 <i className="fa fa-warning"></i></div>
                        <h3 className="font-bold">We couldn't find the page..</h3>

                        <div className="error-desc">
                            Sorry, but the page {requestedPage} was either not found or does not exist. <br/>
                        </div>
                    </div>
                </DocumentTitle>
            );
        }
    });

    module.exports = PageNotFoundError;

})();