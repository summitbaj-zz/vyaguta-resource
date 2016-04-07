;(function () {
    'use-strict';

    //React dependencies
    var React = require('react');
    var HistoryItem = React.createClass({
            getInitialState: function () {
                return {
                    action: '',
                    actionData: [],
                    changedEntity: '',
                    createdAt: ''
                }
            },

            componentDidMount: function () {
                console.log(this.props.history)
                this.setAction();
                this.setChangedEntity();
                this.setActionData();
                this.setState({createdAt: this.getTime()});
            },

            setAction: function () {
                var action;
                if (!this.props.history.changed) {
                    action = 'added';
                } else {
                    action = 'edited';
                }
               this.state.action = action;
                this.setState({action: action});
            },

            setChangedEntity: function () {
                var changedEntity;
                switch (this.props.history.changedEntity) {
                    case 'Project':
                        changedEntity = 'This project';
                        break;
                    case 'Contract':
                        changedEntity = 'Contract';             //Until decided what to do.
                        break;
                    case 'ContractMember':
                        changedEntity = 'Contract Member'      //Until back end fixes it.
                        break;
                }
                this.setState({changedEntity: changedEntity});
            },

            setActionData: function () {
                var history = this.props.history || 0;
                var actionData = {};
                var invalidKeys = ['changed', 'changedEntity', 'createdBy', 'createdAt', 'employee', 'reason', 'batch', 'contractMember'];

                for (var key in history) {
                    if (!(invalidKeys.indexOf(key) > -1) && (history[key] || (!history[key] && this.state.action == 'edited'))) {
                        actionData[key] = history[key];

                    }
                }
                this.setState({actionData: actionData});
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
                        //return this.getAppendedName(this.state.actionData[data]);
                        return 'Bishal Shrestha';                //until back end fixes it
                    case 'client':
                        return this.state.actionData[data].name;
                    default:
                        return this.state.actionData[data].title;
                }
            },

            listChanges: function (data) {
                var displayData;
                if (!this.state.actionData[data]) {
                    return <p
                        className="changed-field"
                        key={data}>{'The field ' + this.changeKeyToDisplayableForm(data).toLowerCase() + ' was removed.' }</p>
                } else if (typeof(this.state.actionData[data]) === 'object') {
                    displayData = this.getDataForDisplay(data);
                } else {
                    displayData = this.state.actionData[data];
                }
                return (<p className="changed-field"
                           key={data}>{this.changeKeyToDisplayableForm(data) + ' : ' + displayData}</p>);
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

            getTime: function () {
                var date = new Date(this.props.history.createdAt);
                var seconds = Math.floor((new Date() - date) / 1000);

                var interval = Math.floor(seconds / 302400);
                if (interval >= 1) {
                    var convertedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                    return convertedDate;
                }
                interval = Math.floor(seconds / 86400);
                if (interval >= 1) {
                    return interval + " days ago";
                }
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    return interval + " hours ago";
                }
                interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                    return interval + " minutes ago";
                }
                return Math.floor(seconds) + " seconds ago";
            },

            render: function () {
                var actionClassName = (this.state.action == 'added') ? 'fa fa-plus' : 'fa fa-pencil';
                var changeKeys = Object.keys(this.state.actionData);
                var createdBy = this.props.history.createdBy.id && ' by ' + this.props.history.createdBy.id;
                return (
                    <li data-toggle="tooltip" title={this.props.history.reason}>
                        <div className="timeline-icon"><i
                            className={actionClassName}></i>
                        </div>
                        <div className="timeline-time">
                            {this.state.createdAt}
                        </div>
                        <div className="timeline-content">
                            <p className="push-bit">
                                <strong>{this.changeKeyToDisplayableForm(this.props.history.changedEntity)}</strong>
                                : {this.state.changedEntity} was
                                {' ' + this.state.action}
                                {createdBy}.
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