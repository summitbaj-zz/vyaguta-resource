/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 5/9/16.
 */

;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstants = require('../../constants/urlConstants');

    //utils
    var employeeUtil = require('../../utils/employeeUtil');

    var BudgetTypeRow = React.createClass({
        render: function () {
            var operational = this.props.operationalResource;
            return (
                <tr>
                    <td>{this.props.index}</td>
                    <td>{employeeUtil.getEmployeeName(operational.employee)}</td>
                    <td>{operational.employee.designation}</td>
                    <td className="text-center">
                        <div className="btn-group">
                            <button
                                className="btn btn-sm btn-default"
                                onClick={this.props.deleteOperationalResource.bind(null, operational.id)}><i
                                className="glyphicon glyphicon-trash"></i></button>
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = BudgetTypeRow;

})();