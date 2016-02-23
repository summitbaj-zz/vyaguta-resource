jest.dontMock('../../src/js/components/project-status/ProjectStatusList')
    .dontMock('lodash')
    .dontMock('../../src/js/store/store')
    .dontMock('../../src/js/reducers/crudReducer');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var List = require('../../src/js/components/project-status/ProjectStatusList').WrappedComponent;

var ProjectStatus = require('../../src/js/components/project-status/ProjectStatusRow');

var crudActions = require('../../src/js/actions/crudActions');
var store = require('../../src/js/store/store');

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
       list = TestUtils.renderIntoDocument(<List projectStatus={projectStatusArray}/>);
    });

    it('calls getAll method of crudAction on component mount', function(){
        list.componentDidMount();
        expect(crudActions.fetchAll).toBeCalled();
    });

    it('returns one project Status component when list function is called', function () {
        var key = 1;
        var actual = <ProjectStatus key={key} index={key} projectStatus={list.props.projectStatus[key]}
                                    deleteProjectStatus={list.delete}/>

        var expected = list.list(key);
        expect(expected).toEqual(actual);
    });

    it('doesnot call deleteItem function of crudActions when confirmation is cancelled', function () {
        var ab = spyOn(window, 'confirm').andReturn(false);
        list.delete();
        expect(crudActions.deleteItem).not.toBeCalled();

    });

    it('calls deleteItem function of crudActions on confirmation', function () {
        spyOn(window, 'confirm').andReturn(true);
        list.delete();
        expect(crudActions.deleteItem).toBeCalled();
    });
});
