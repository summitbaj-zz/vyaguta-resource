/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/10/16.
 */

;(function() {

    //React dependencies
    var React = require('react');

    //libraries
    var NProgress = require('nprogress');

    var PageNotFoundError = React.createClass({
        componentDidMount: function() {
            NProgress.done();
        },

        render: function() {
            return (
                <div className="error">
                    <div className="error-code m-b-10 m-t-20">404 <i className="fa fa-warning"></i></div>
                    <h3 className="font-bold">We couldn't find the page..</h3>

                    <div className="error-desc">
                        Sorry, but the page you are looking for was either not found or does not exist. <br/>
                    </div>
                </div>
            );
        }
    })

    module.exports = PageNotFoundError;
})();