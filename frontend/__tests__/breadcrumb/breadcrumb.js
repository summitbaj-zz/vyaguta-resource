jest.dontMock('../../src/js/components/common/breadcrumb/BreadCrumb');

var BreadCrumb = require('../../src/js/components/common/breadcrumb/BreadCrumb');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Link = require('react-router').Link;
describe('BreadCrumb', function () {
    it('calls setPathState function on load', function () {
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb />);
        breadCrumb.setPathState = jest.genMockFunction();
        breadCrumb.componentWillMount();
        expect(breadCrumb.setPathState).toBeCalled();
    });
    it('sets correct state on providing path', function () {
        var routes = [{
            name: 'abcd',
            path: 'abcd'
        }];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);
        expect(breadCrumb.state.paths.length).toEqual(1);
    });
    it('does not set correct state on not providing path', function () {
        var routes = [{name: 'abcd'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);
        expect(breadCrumb.state.paths.length).toEqual(0);
    });
    it('does not set correct state on not providing name', function () {
        var routes = [{path: 'abcd'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);
        expect(breadCrumb.state.paths.length).toEqual(0);
    });

});