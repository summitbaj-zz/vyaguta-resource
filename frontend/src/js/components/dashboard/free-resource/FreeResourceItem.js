;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //utils
    var employeeUtil = require('../../../utils/employeeUtil');

    var FreeResourceItem = React.createClass({
        render: function () {
            var resource = this.props.resource;
            return (
                <div className="col-xs-12 col-sm-6 col-lg-3">
                    <a className="widget widget-hover-effect1">
                        <div className="widget-simple widget-custom">
                            <div className="cards">
                                <h3 className="widget-content text-center animation-pullDown">{employeeUtil.getEmployeeName(resource)}</h3>
                                <span className="cards-counts">{(resource.availableAllocation) * 100 + '%'}</span>
                                <span className="cards-text">{resource.designation}</span>
                            </div>
                        </div>
                    </a>
                </div>
            );
        }
    });

    module.exports = FreeResourceItem;

})();