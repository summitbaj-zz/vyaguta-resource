jest.dontMock('../../src/js/components/common/breadcrumb/BreadCrumb')
    .dontMock('react-router');

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

    it('does not set state on not providing path', function () {
        var routes = [{name: 'abcd'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);
        expect(breadCrumb.state.paths.length).toEqual(0);
    });

    it('does not set state on not providing name', function () {
        var routes = [{path: 'abcd'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);
        expect(breadCrumb.state.paths.length).toEqual(0);
    });

    it('gives one list item when getComponent function is called', function () {
        var routes = [{name: 'abcd', path: 'abcdx'}, {name: 'wxyz', path: 'wxyz'}, {name: 'wxyz', path: 'wxyz'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);

        var key = 1;
        var actual = breadCrumb.getComponent(key);
        var expected = (<li key={key}>
            <Link to={breadCrumb.state.paths[key].route}>{breadCrumb.state.paths[key].name} </Link>
        </li>);
        expect(expected).toEqual(actual);
    });

    it('does not call getComponent function when there is only one route', function () {
        var routes = [{name: 'abcd', path: 'abcdx'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);
        breadCrumb.getComponent = jest.genMockFunction();
        breadCrumb.render();

        expect(breadCrumb.getComponent).not.toBeCalled();
    });

    it('returns div when there is no route', function () {
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb />);

        var actual = breadCrumb.render();
        var expected = <div></div>;
        expect(expected).toEqual(actual);
    });

    it('returns ul when there is route', function () {
        var routes = [{name: 'abcd', path: 'abcdx'}];
        var breadCrumb = TestUtils.renderIntoDocument(<BreadCrumb routes={routes}/>);

        var actual = breadCrumb.render();
        var list = TestUtils.findRenderedDOMComponentWithTag(breadCrumb, 'ul');
        expect(list).not.toEqual(null);
    });
});
