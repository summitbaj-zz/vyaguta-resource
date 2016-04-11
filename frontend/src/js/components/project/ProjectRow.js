;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstant = require('../../constants/urlConstant');

    var ProjectRow = React.createClass({
        render: function () {
            var id = this.props.project.id;

            var style = {
                background: this.props.project.projectStatus && this.props.project.projectStatus.color
            };

            return (
                <tr>
                    <td>{this.props.index}</td>
                    <td><Link to={urlConstant.PROJECTS.INDEX + '/' + id +  urlConstant.PROJECTS.VIEW}>{this.props.project.title}</Link></td>
                    <td>{this.props.project.projectType && this.props.project.projectType.title}</td>
                    <td className="text-center"><span
                        className="label text-uppercase"
                        style={style}>{this.props.project.projectStatus && this.props.project.projectStatus.title}</span>
                    </td>
                    <td className="text-center">
                        <div className="btn-group"><Link to={urlConstant.PROJECTS.INDEX + '/' + id} data-toggle="tooltip"
                                                         title="Edit"
                                                         className="btn btn-sm btn-default"><i
                            className="fa fa-pencil"></i></Link>
                            <Link to={urlConstant.PROJECTS.INDEX +'/' + id +  urlConstant.PROJECTS.VIEW} data-toggle="tooltip"
                                  title="View Details"
                                  className="btn btn-sm btn-default"><i
                                className="glyphicon glyphicon-list-alt"></i></Link>
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = ProjectRow;

})();