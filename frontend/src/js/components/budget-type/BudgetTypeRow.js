/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/15/16.
 */

;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstant = require('../../constants/urlConstants');

    var BudgetTypeRow = React.createClass({
        render: function () {
            return (
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.budgetType.title}</td>
                    <td className="text-center">
                        <div className="btn-group"><Link
                            to={urlConstant.BUDGET_TYPES.INDEX + '/' + this.props.budgetType.id}
                            data-toggle="tooltip"
                            title="Edit"
                            className="btn btn-sm btn-default"><i
                            className="fa fa-pencil"></i></Link>
                            <button
                                className="btn btn-sm btn-default"
                                onClick={this.props.deleteBudgetType.bind(null, this.props.budgetType.id)}><i
                                className="glyphicon glyphicon-trash"></i></button>
                        </div>
                    </td>
                </tr>
            )
        }
    });

    module.exports = BudgetTypeRow;

})();