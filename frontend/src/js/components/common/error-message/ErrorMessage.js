;(function () {
    'use strict';

    var React = require('react');
    var connect = require('react-redux').connect;
    var errorActions = require('../../../actions/errorActions');
    //constants
    var resourceConstant = require('../../../constants/resourceConstant');

    var ErrorMessage = React.createClass({

        render: function () {

            if (this.props.errorMessage) {
                return (
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="error-container">
                                {this.props.errorMessage}
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (<div></div>)
            }
        }
    });

    var selectStore = function (store) {
        return {
            errorMessage: store.errorReducer.get(resourceConstant.ERROR_MESSAGE)
        }
    };

    module.exports = connect(selectStore)(ErrorMessage);

})();
