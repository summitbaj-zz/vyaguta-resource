/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 6/13/16.
 */

;(function () {

    //React dependencies
    var React = require('react');
    var Link = require('react-router').Link;

    //constants
    var urlConstants = require('../../constants/urlConstants');
    var resourceConstants = require('../../constants/resourceConstants');

    var crudActions = require('../../actions/crudActions');

    var UserRoleRow = React.createClass({

        getInitialState: function(props){
            return {
                isEditing : false,
                userRole: {}
            }
        },

        componentWillMount: function(){
            this.setState({userRole: this.props.userRole.role})
        },

        toggleEditMode : function () {
            this.setState({
                isEditing: !this.state.isEditing
            })
        },

        updateUserRole: function (event) {
            this.props.actions.updateItemWithCallback(resourceConstants.USER_ROLES, this.generateFormData(), this.props.userRole.id, this.setRole);
            this.toggleEditMode();
        },
        
        setRole: function(role){
            this.setState({userRole:role})
        } ,

        generateFormData: function () {
            return({
                    id : this.props.userRole.id,
                    role:{
                        id: this.state.userRole.id
                    },
                    user:{
                        id : this.props.userRole.user.id
                    }
            });
        },
        
        changeRole: function(){
            this.state.userRole.id = this.refs.userRoleID.value;
            this.setState({userRole:this.state.userRole})
        },

        render: function () {
            return (
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.userRole.user.name}</td>
                    {!this.state.isEditing ? <td>{this.state.userRole.title}</td> :
                        <td>
                            <select className="form-control" name="role" ref="userRoleID" value={this.state.userRole.id} onChange={this.changeRole}>
                                {
                                    this.props.roles.map(function(role) {
                                        return <option key={role.id} value={role.id}>{role.title}</option>
                                    })
                                }
                            </select>
                        </td>
                    }
                    <td className="text-center">
                        <div className="btn-group">
                            {!this.state.isEditing ?
                                <button className="btn btn-sm btn-default" onClick={this.toggleEditMode}>
                                    <i className="fa fa-pencil"></i>
                                </button> :
                                <span>
                                    <button className="btn btn-sm btn-success" onClick={this.updateUserRole}> Update </button>
                                    <button className="btn btn-sm btn-danger" onClick={this.toggleEditMode}>  Cancel </button>
                                </span>
                            }
                        </div>
                    </td>
                </tr>
            );
        }
    });

    module.exports = UserRoleRow;

})();
