;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstants = require('../../constants/urlConstants');

    var ProjectRoleRow = React.createClass({
        render: function () {
            var id = this.props.projectRole.id;
            return (
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.projectRole.title}</td>
                    <td className="text-center">
                        <div className="btn-group"><Link to={urlConstants.PROJECT_ROLES.INDEX + '/' + id} data-toggle="tooltip"
                                                         title="Edit"
                                                         className="btn btn-sm btn-default"><i
                            className="fa fa-pencil"></i></Link>
                            <button
                                onClick={this.props.deleteProjectRole.bind(null, id)} data-toggle="tooltip"
                                title="Delete"
                                className="btn btn-sm btn-default"><i className="glyphicon glyphicon-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = ProjectRoleRow;

})();