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
                        className="changed-field"
                        key={key}>{'The field ' + this.changeKeyToDisplayableForm(key).toLowerCase() + ' was removed.' }</p>);

                } else if (data == 'billed') {
                    displayData = data.billed ? 'Yes' : 'No';
                } else {
                    displayData = data[key];
                }
                return (<p className="changed-field"
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

            toggleShowHide: function (e) {
                e.target.innerHTML = (e.target.innerHTML == 'Show') ? 'Hide' : 'Show';
            },

            showReason: function (reason, index) {
                return (
                    <div id={"ReadMorePanel" + index}>
                        <span className="weight-500">Reason</span>:
                        <a data-toggle="collapse" data-target={"#ReadMoreInfo" + index}
                           onClick={this.toggleShowHide} className="cursor-pointer">Show</a>
                        <div id={"ReadMoreInfo" + index} className="panel-collapse collapse">
                            {reason}
                        </div>
                    </div>
                )
            },

            render: function () {
                var history = this.props.history;
                var actionClassName = (history.action == 'added') ? 'fa fa-plus' : 'fa fa-pencil';
                var createdBy = history.createdBy && ' by ' + history.createdBy;
                return (
                    <li data-toggle="tooltip">
                        <div className="timeline-icon"><i
                            className={actionClassName}></i>
                        </div>
                        <div className="timeline-time">
                            {history.createdAt}
                        </div>
                        <div className="timeline-content">
                            <p className="push-bit">
                                <strong>{this.changeKeyToDisplayableForm(history.changedEntity)}</strong>
                                : {history.changedData} was
                                {' ' + history.action}
                                {createdBy}.
                            </p>
                            {Object.keys(history.fields).map(this.listChanges.bind(null, history.fields))}
                            {history.reason &&
                            <div>
                                {this.showReason(history.reason, this.props.index)}</div>
                            }
                        </div>
                    </li>
                );
            }
        })
        ;
    module.exports = HistoryItem;
})();