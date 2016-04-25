;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    var FreeResourceItem = React.createClass({
        getEmployeeName: function (employee) {
            var name = '-';
            name = employee.firstName;
            if (employee.middleName && employee.middleName != 'NULL') {
                name = name.concat(' ', employee.middleName);
            }
            name = name.concat(' ', employee.lastName);
            return name;
        },
        render: function () {
            var resource = this.props.resource;
            return (
                <div className="col-xs-12 col-sm-6 col-lg-3">
                    <a className="widget widget-hover-effect1">
                        <div className="widget-simple widget-custom">
                            <div className="cards">
                                <h3 className="widget-content text-center animation-pullDown">{this.getEmployeeName(resource)}</h3>
                                <span className="cards-counts">{(1 - resource.allocation) * 100 + '%'}</span>
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