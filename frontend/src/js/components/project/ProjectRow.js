;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstant = require('../../constants/urlConstant');

    var ProjectRow = React.createClass({
        render: function () {
            var id = this.props.project.id;
            return (
                <tr>
                    <td>{++this.props.index}</td>
                    <td>{this.props.project.title}</td>
                    <td>{this.props.project.projectType.title}</td>
                    <td>{this.props.project.projectStatus.title}</td>
                    <td>{this.props.project.budgetType.title}</td>
                    <td>{this.props.project.startDate}</td>
                    <td>{this.props.project.endDate}</td>

                    <td className="text-center">
                        <div className="btn-group"><Link to={urlConstant.PROJECTS.EDIT + id} data-toggle="tooltip"
                                                         title="Edit"
                                                         className="btn btn-sm btn-default"><i
                            className="fa fa-pencil"></i></Link>
                            <Link to={urlConstant.PROJECTS.DETAILS +'/' + id} data-toggle="tooltip"
                                  title="View Details"
                                  className="btn btn-sm btn-default"><i
                                className="fa fa-eye"></i></Link>
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = ProjectRow;

})();