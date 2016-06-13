/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 6/13/16.
 */

;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstants = require('../../constants/urlConstants');

    var UserRoleRow = React.createClass({
        render: function () {
            return (
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.userRole.user.name}</td>
                    <td>{this.props.userRole.role.title}</td>
                    <td className="text-center">
                        <div className="btn-group">
                            <button
                                className="btn btn-sm btn-default"><i
                                className="fa fa-pencil"></i></button>
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = UserRoleRow;

})();
