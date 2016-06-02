/**
 * Created by
 * Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 * on 5/9/16.
 */

;(function () {
    'use strict';

    var React = require('react');

    var OperationalResourceMain = React.createClass({
       render : function(){
           return (
               <div id="page-content" className="page-content">
                   {this.props.children}
               </div>
           );
       }
    });

    module.exports = OperationalResourceMain;
})();