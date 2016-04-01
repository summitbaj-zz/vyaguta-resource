;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');
    var HistoryItem = React.createClass({
        render: function () {
            return (
                <li>
                    <div className="timeline-icon"><i
                        className="fa fa-pencil"></i>
                    </div>
                    <div className="timeline-time">{this.props.history.createdAt}</div>
                    <div className="timeline-content">
                        <p className="push-bit"><strong>Team Member</strong>
                        </p>
                        <p className="push-bit">Anjali Shakya was added to
                            this
                            team</p>
                    </div>
                </li>
            );
        }
    });
    module.exports = HistoryItem;
})();