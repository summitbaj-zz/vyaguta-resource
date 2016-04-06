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
                console.log(this.props);
                var action;
                var actionData;
                if (!this.props.history.changed) {
                    console.log('asdf');
                    action = 'added';
                    //actionData = this.props.history.add;
                } else {
                    console.log('edit');
                    action = 'edited';
                    //actionData = this.props.history.changes;
                }
                actionData = this.createObjectForDisplaying();

                this.setState({action: action});
                //this.setState({actionData: actionData});
                switch (this.props.history.changedEntity) {
                    case 'Project':
                        this.setState({title: 'This project'});
                        break;
                    case 'Contract':
                        this.setState({title: 'Contract'});
                        break;
                    case 'ContractMember':
                        this.setState({title: 'Contract Member'});
                        break;
                    default:
                        break;
                }
            },

            createObjectForDisplaying: function(){
                var history = this.props.history || 0;
                for(var key in history){

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
                console.log(this.state.action);
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
                            <p className="push-bit"><strong>{this.changeKeyToDisplayableForm(this.props.history.changedEntity)}</strong> : {this.state.title} was
                                {' ' + this.state.action} by
                                {' ' + this.props.history.createdBy.id}.
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