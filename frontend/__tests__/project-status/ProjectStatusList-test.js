jest.dontMock('../../src/js/components/project-status/ProjectStatusList')
    .dontMock('lodash')
    .dontMock('../../src/js/store')
    .dontMock('../../src/js/reducers/crudReducer')
    .dontMock('../../src/js/routes')
    .dontMock('react-redux');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var List = require('../../src/js/components/project-status/ProjectStatusList');
var ProjectStatus = require('../../src/js/components/project-status/ProjectStatusRow');
var crudActions = require('../../src/js/actions/crudActions');
var store = require('../../src/js/store');

var projectStatusArray = [
    {
        name: 'dfdsfsdf',
        id: 13
    },
    {
        name: 'erer',
        id: 14
    },
    {
        name: 'sdf',
        id: 15
    }
];
var list;

describe('List', function () {
    beforeEach(function () {
        list = TestUtils.renderIntoDocument(<List store={store}/>);
    });

    /*it('calls getAll method of crudAction on component mount', function(){
        list.componentDidMount();
        expect(crudActions.getAll).toBeCalled();

    });*/
    it('returns one project Status component when list function is called', function () {
        var key = 0;
        var abcc = TestUtils.scryRenderedComponentsWithType(list, List);
        console.warn(abcc.renderedElement);
        var items = list.props.store.getState().crudReducer.get('projectStatus');
        var actual = <ProjectStatus key={key} index={key} projectStatus={items[key]}
                                    deleteProjectStatus={list.delete}/>

        var expected = list.list(key);
        expect(expected).toEqual(actual);
    });

    /*it('doesnot call deleteItem function of crudActions when confirmation is cancelled', function () {

        var ab = spyOn(window, 'confirm').andReturn(false);
        list.delete();
        expect(crudActions.deleteItem).not.toBeCalled();

    });

    it('calls deleteItem function of crudActions on confirmation', function () {
        spyOn(window, 'confirm').andReturn(true);
        list.delete();
        expect(crudActions.deleteItem).toBeCalled();
    });*/
});
