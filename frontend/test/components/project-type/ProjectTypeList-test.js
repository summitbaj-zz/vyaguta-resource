jest.dontMock('../../../src/js/components/project-type/ProjectTypeList')
    .dontMock('lodash')
    .dontMock('../../../src/js/store/store')
    .dontMock('../../../src/js/reducers/crudReducer');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var List = require('../../../src/js/components/project-type/ProjectTypeList').WrappedComponent;

var ProjectType = require('../../../src/js/components/project-type/ProjectTypeRow');

var crudActions = require('../../../src/js/actions/crudActions');
var store = require('../../../src/js/store/store');

var projectTypesArray = [
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
        list = TestUtils.renderIntoDocument(<List projectTypes={projectTypesArray}/>);
    });

    it('calls getAll method of crudAction on component mount', function(){
        list.componentDidMount();
        expect(crudActions.fetchAll).toBeCalled();
    });

    it('returns one project type component when list function is called', function () {
        var key = 1;
        var actual = <ProjectType key={key} index={key} projectType={list.props.projectTypes[key]}
                                    deleteProjectType={list.delete}/>

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
