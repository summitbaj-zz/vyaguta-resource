;(function () {
    'use strict';

    //React dependencies
    var React = require('react');
    var connect = require('react-redux').connect;

    //constants
    var resourceConstant = require('../../../constants/resourceConstant');
    var ErrorMessage = React.createClass({
        render: function () {
            if (this.props.errorMessage) {
                $('#page-content').css('min-height', 'Calc(100% - 122px)');
                return (
                    <div className="row error-message">
                        <div className="col-lg-12">
                            <div className="error-container">
                                {this.props.errorMessage}
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                $('#page-content').css('min-height', 'Calc(100% - 84px)');
                return (<div className="row"></div>)
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
