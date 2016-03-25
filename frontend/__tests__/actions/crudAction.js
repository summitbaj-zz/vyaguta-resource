jest.dontMock('../../src/js/actions/crudActions')
    .dontMock('lodash')
    .dontMock('../../src/js/store/store')
    .dontMock('../../src/js/reducers/crudReducer');

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var CrudActions = require('../../src/js/actions/crudActions');
var ApiUtil = require('../../src/js/util/apiUtil');
var actionTypeConstant = require('../../src/js/constants/actionTypeConstant');
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

describe('Actions', function () {
    it('calls fetchAll function of ApiUtil', function () {
        var callback = function () {}
        CrudActions.fetchAll('projectstatus');
        expect(ApiUtil.fetchAll).toBeCalledWith('projectstatus', callback);
    });

    it('calls dispatch function of store on successful fetching of data', function () {
        store.dispatch = jest.genMockFunction();
        ApiUtil.fetchAll = function (entity, callback) {
            callback('mock data');
        }
        CrudActions.fetchAll('projectStatus');
        expect(store.dispatch).toBeCalledWith({
            type: actionTypeConstant.LIST,
            data: 'mock data',
            entity: 'projectStatus'
        });
    });

    it('calls delete function of ApiUtil', function () {
        var mock = function () {
        }
        CrudActions.deleteItem('projectStatus', 3, 'mockdata');
        expect(ApiUtil.delete).toBeCalledWith('projectStatus', 3, mock);
    });

    it('deletes data item before calling dispatch', function(){
        store.dispatch = jest.genMockFunction();
        ApiUtil.delete = function (entity, id, callback) {
            callback(id);
        }
        CrudActions.deleteItem('projectStatus', 13, projectStatusArray);
        expect(projectStatusArray.length).toEqual(2);
    });

    it('calls dispatch function of store on successful deletion of data', function () {
        store.dispatch = jest.genMockFunction();
        ApiUtil.delete = function (entity, id, callback) {
            callback(id);
        }
        CrudActions.deleteItem('projectStatus', 14, projectStatusArray);
        expect(store.dispatch).toBeCalledWith({
            type: actionTypeConstant.DELETE,
            data: projectStatusArray,
            entity: 'projectStatus'
        });
    });
});
