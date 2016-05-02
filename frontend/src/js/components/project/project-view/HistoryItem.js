;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');

    var moment = require('moment');

    var HistoryItem = React.createClass({
        listChanges: function (data, key) {
            var displayData;
            if (data[key] == null) {
                return (<p
                    className="changed-field container"
                    key={key}>{'The field ' + this.changeKeyToDisplayableForm(key).toLowerCase() + ' was removed.' }</p>);

            } else if (key == 'billed') {
                displayData = data.billed ? 'Yes' : 'No';
            } else {
                displayData = data[key];
            }
            return (<p className="changed-field container"
                       key={key}><span className="weight-500">{this.changeKeyToDisplayableForm(key)}</span>
                : {displayData}</p>);
        },

        changeKeyToDisplayableForm: function (data) {
            var data = data || '';
            return data
            // insert a space before all caps
                .replace(/([A-Z])/g, ' $1')
                // uppercase the first character
                .replace(/^./, function (str) {
                    return str.toUpperCase();
                })
        },

        renderEachAction: function (key) {
            var history = this.props.history.changes[key];
            var createdBy = this.props.history.createdBy && ' by ' + this.props.history.createdBy;
            return (
                <div className="push-bit" key={key}>
                    <p className="changed-field weight-500">
                        {history.changedData}
                        {' ' + history.action}
                        {createdBy}
                    </p>
                    {Object.keys(history.fields).map(this.listChanges.bind(null, history.fields))}
                </div>
            );
        },

        render: function () {
            var history = this.props.history;
            var createdBy = history.createdBy && ' by ' + history.createdBy;
            return (
                <li data-toggle="tooltip">
                    <div className="timeline-icon"><i
                        className='fa fa-pencil'></i>
                    </div>
                    <div className="timeline-time">
                        {history.createdAt}
                    </div>
                    <div className="timeline-content">
                        {Object.keys(history.changes).map(this.renderEachAction)}
                        {
                            history.reason &&
                            <p><span className="weight-500">Reason: </span>
                                {history.reason}</p>
                        }
                    </div>
                </li>
            );
        }
    });
    module.exports = HistoryItem;
})();