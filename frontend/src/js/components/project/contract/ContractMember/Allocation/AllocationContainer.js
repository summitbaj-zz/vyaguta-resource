/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/1/16.
 */

;(function () {

    //React and redux dependencies
    var React = require('react');

    //components
    var Allocation = require('./Allocation');

    var AllocationContainer = React.createClass({
        renderAllocation: function (key) {
            return (
                <Allocation key={key} index={key}/>
            )
        },

        addAllocation: function (event) {
            event.preventDefault();
            this.props.actions.addAllocation();
        },

        render: function () {
            return (
                <div className="panel-group custom-accordion" id="accordion" role="tablist"
                     aria-multiselectable="true">

                    {this.props.allocations && Object.keys(this.props.allocations).map(this.renderAllocation)}

                    <div className="btn-block padding-v-10">
                        <a className="btn btn-xs btn-default"
                           href="#"
                           onClick={this.addAllocation}>
                            <i className="fa fa-plus icon-space"></i>Add Another Allocation
                        </a>
                    </div>
                </div>
            )
        }
    });

    module.exports = AllocationContainer;
})();