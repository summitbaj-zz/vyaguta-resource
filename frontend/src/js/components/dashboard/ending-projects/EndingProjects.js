;(function () {
    'use strict';

    //React Dependencies
    var React = require('react');

    //utils
    var convertContractHash = require('../../../util/convertContractHash');

    //components
    var EndingProjectRow = require('./EndingProjectRow');

    var EndingProjects = React.createClass({


        isEnding: function (date) {
            var date1 = new Date();
            var date2 = new Date(date);
            var timeDiff = date2.getTime() - date1.getTime();
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays <= 15 && diffDays >= 0) {
                return true;
            }
        },

        getEndingProjectsData: function (endingProjects) {
            var that = this;
            var endingProjectsArray = [];
            var id = 0;

            for (var i = 0; i < endingProjects.length; i++) {
                var endingContracts = convertContractHash.toFrontEndHash(endingProjects[i].contracts);
                for (var j = 0; j < endingContracts.length; j++) {
                    if (that.isEnding(endingContracts[j].endDate)) {
                        var endingProjectObject = {
                            id: id,
                            projectId: endingProjects[i].id,
                            endDate: endingContracts[j].endDate,
                            project: endingProjects[i].title,
                            resources: endingContracts[j].contractMembers.length
                        };
                        id++;
                        endingProjectsArray.push(endingProjectObject);
                    }
                }
            }
            return endingProjectsArray;
        },

        renderEndingProject: function (endingProject) {
            return (
                <EndingProjectRow key={endingProject.id} endingProject={endingProject}/>
            );
        },

        getEndingProjectsResourceTotal: function (endingProjects) {
            var resources = 0;
            for (var i = 0; i < endingProjects.length; i++) {
                resources += parseInt(endingProjects[i].resources);
            }
            return resources;
        },

        render: function () {
            var endingProjects = (this.props.endingProjects.length > 0) ? this.getEndingProjectsData(this.props.endingProjects) : null;

            return (
                    <div className="col-lg-6">
                        <div className="block">
                            <div className="block-title-border clearfix"><span
                                className="pull-left">Projects Ending </span>
                            </div>
                            <div className="list-wrapper">
                                <ul className="list-group">
                                    <li className="list-group-item"><span
                                        className="list-group-project">Projects</span>
                                        <span>End Date</span><span>Resources</span>
                                    </li>
                                    {endingProjects && endingProjects.map(this.renderEndingProject)}
                                    <li className="list-group-item total">
                                        <span>Total</span><span>{endingProjects && this.getEndingProjectsResourceTotal(endingProjects) || 0}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

            );
        }
    });
    module.exports = EndingProjects;
})();