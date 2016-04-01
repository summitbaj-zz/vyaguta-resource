;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');
    var HistoryItem = React.createClass({
            getInitialState: function () {
                return {
                    action: '',
                    actionData: [],
                    title: '',
                    reasonDisplay: {}
                }
            },

            componentDidMount: function () {
                var action;
                var actionData;
                if (this.props.history.add) {
                    action = 'added';
                    actionData = this.props.history.add;
                } else {
                    action = 'edited';
                    actionData = this.props.history.changes;
                }
                this.setState({action: action});
                this.setState({actionData: actionData});
                switch (this.props.history.type) {
                    case 'Project':
                        this.setState({title: 'This project'});
                        break;
                    case 'Contract':
                        this.setState({title: this.props.history.title});
                        break;
                    case 'Contract Member':
                        this.setState({title: 'bishal'});
                        break;
                    default:
                        break;
                }
            },

            getAppendedName: function (accountManager) {
                var name = accountManager.firstName;
                if (accountManager.middleName) {
                    name = name.concat(' ', accountManager.middleName);
                }
                name = name.concat(' ', accountManager.lastName);
                return name;
            },


            getDataForDisplay: function (data) {
                switch (data) {
                    case 'accountManager':
                        return this.getAppendedName(this.state.actionData[data]);
                    default:
                        return this.state.actionData[data].title;
                }
            },
            listChanges: function (data) {
                var displayData;
                if (typeof(this.state.actionData[data]) === 'object') {
                    displayData = this.getDataForDisplay(data);
                } else {
                    displayData = this.state.actionData[data];
                }
                console.log(displayData);
                return (<p className="push-bit">{this.changeKeyToDisplayableForm(data) + ' : ' + displayData}</p>);
            },

            changeKeyToDisplayableForm: function(data){
                return data
                // insert a space before all caps
                    .replace(/([A-Z])/g, ' $1')
                    // uppercase the first character
                    .replace(/^./, function(str){ return str.toUpperCase(); })
            },

            render: function () {
                var actionClassName = (this.state.action == 'added') ? 'fa fa-plus' : 'fa fa-pencil';
                var changeKeys = Object.keys(this.state.actionData);
                return (
                    <li data-toggle="tooltip" title={this.props.history.reason}>
                        <div className="timeline-icon"><i
                            className={actionClassName}></i>
                        </div>
                        <div className="timeline-time">
                            {this.props.history.createdAt}
                        </div>
                        <div className="timeline-content">
                            <p className="push-bit"><strong>{this.props.history.type}</strong> : {this.state.title} was
                                {' ' + this.state.action} by
                                {' ' + this.props.history.createdBy}.
                            </p>
                            {changeKeys.map(this.listChanges)}
                        </div>
                    </li>
                );
            }
        })
        ;
    module.exports = HistoryItem;
})();