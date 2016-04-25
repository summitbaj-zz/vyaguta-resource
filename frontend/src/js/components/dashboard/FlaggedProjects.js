;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //utils
    var convertContractHash = require('../../util/convertContractHash');

    //components
    var FlaggedProjectRow = require('./FlaggedProjectRow');

    var FlaggedProjects = React.createClass({
        renderFlaggedProject: function (flaggedProject) {
            return (
                <FlaggedProjectRow key={flaggedProject.id} flaggedProject={flaggedProject}/>
            );
        },

        render: function () {
            var flaggedProjects = (this.props.flaggedProjects.length > 0) ? this.getFlaggedProjectsData(this.props.flaggedProjects) : null;

            return (

                    <div className="col-lg-6">
                        <div className="block">
                            <div className="block-title-border clearfix"><span
                                className="pull-left">Projects Flagged </span>
                            </div>
                            <div className="list-wrapper">
                                <ul className="list-group">
                                    <li className="list-group-item"><span
                                        className="list-group-project">Projects</span>
                                        <span>End Date</span><span>Resources</span>
                                    </li>
                                    {flaggedProjects && flaggedProjects.map(this.renderFlaggedProject)}
                                </ul>
                            </div>

                    </div>
                </div>
            );
        }
    });
    module.exports = FlaggedProjects;
})();