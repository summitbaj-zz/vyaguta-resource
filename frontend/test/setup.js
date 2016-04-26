/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 4/19/16.
 */

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document', 'localStorage'];

global.document = jsdom('');
global.window = document.defaultView;
global.localStorage = {getItem: ()=>{}, setItem: ()=>{}};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

//for jQuery
global.jQuery = require('jquery');
global.$ = global.jQuery;
global.window.jQuery = global.jQuery;
global.window.$ = global.jQuery;

//for jQuery plugins
require('jquery-confirm');
require('../src/custom-ui/bootstrap-colorselector');