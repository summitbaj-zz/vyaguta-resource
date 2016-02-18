jest.dontMock('../../src/js/components/project-status/List')
    .dontMock('lodash');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var List = require('../../src/js/components/project-status/List');
var ProjectStatus = require('../../src/js/components/project-status/ProjectStatus');
var ApiUtil = require('../../src/js/api-util/ApiUtil');

var projectStatusArray = [
    {
        "name": "dfdsfsdf",
        "id": 13
    },
    {
        "name": "erer",
        "id": 14
    },
    {
        "name": "sdf",
        "id": 15
    }
];
var list;

describe('List', function(){
    beforeEach(function() {
        list = TestUtils.renderIntoDocument(<List />);
    });

    it('stores fetched data correctly into the state', function(){
        list.setNewState(projectStatusArray);
        expect(projectStatusArray).toEqual(list.state.projectStatus);
    });

    it('removes successfully deleted data from the state', function(){
        var id = 13;
        list.setNewState(projectStatusArray);
        list.removeRecordFromState(id);
        expect(list.state.projectStatus.length).toEqual(2);
    });

   it('calls fetchAll function of ApitUtil when component is mounted',function(){
        list.componentDidMount();
        expect(ApiUtil.fetchAll).toBeCalled();
    });

    it('returns one project Status component when list function is called', function(){
        var key = 1;
        var actual =  <ProjectStatus key={key} index={key} projectStatus={list.state.projectStatus[key]} deleteProjectStatus={list.delete}/>
        var expected = list.list(key);
        expect(expected).toEqual(actual);
    });

    it('doesnot call delete function if ApitUtil when confirmation is cancelled', function(){

        var ab = spyOn(window, 'confirm').andReturn(false);
        list.delete();
        expect(ApiUtil.delete).not.toBeCalled();

    });
    it('calls delete function of ApiUtil on confirmation', function(){
        spyOn(window, 'confirm').andReturn(true);
        list.delete();
        expect(ApiUtil.delete).toBeCalled();
    });
});