;(function () {
    var React = require('react');
    var Link = require('react-router').Link;
    var urlConstant = require('../../constants/urlConstant');

    var ProjectRow = React.createClass({
        render: function () {
            var id = this.props.project.id;
            return (
                <tr>
                    <td>{++this.props.index}</td>
                    <td>{this.props.project.projects}</td>
                    <td>{this.props.project.type}</td>
                    <td>{this.props.project.status}</td>
                    <td>{this.props.project.budget_type}</td>
                    <td>{this.props.project.start_date}</td>
                    <td>{this.props.project.end_date}</td>

                    <td className="text-center">
                        <div className="btn-group"><Link to={urlConstant.PROJECTS.EDIT + id} data-toggle="tooltip"
                                                         title="Edit"
                                                         className="btn btn-sm btn-default"><i
                            className="fa fa-pencil"></i></Link>
                            <button
                                onClick={this.props.deleteProject.bind(null, id)} data-toggle="tooltip"
                                title="Delete"
                                className="btn btn-sm btn-default"><i className="glyphicon glyphicon-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = ProjectRow;

})();