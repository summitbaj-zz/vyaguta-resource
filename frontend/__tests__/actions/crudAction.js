jest.dontMock('../../src/js/actions/crudActions')
    .dontMock('lodash')
    .dontMock('../../src/js/store')
    .dontMock('../../src/js/reducers/crudReducer');

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var CrudActions = require('../../src/js/actions/crudActions');
var ApiUtil = require('../../src/js/util/ApiUtil');
var actionTypeConstant = require('../../src/js/constants/actionTypeConstant');
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

describe('Actions', function () {
    it('calls fetchAll function of ApiUtil', function () {
        var mock = function () {
        }
        CrudActions.fetchAll('mock');
        expect(ApiUtil.fetchAll).toBeCalledWith('mock', mock);
    });

    it('calls dispatch function of store on successful fetching of data', function () {
        store.dispatch = jest.genMockFunction();
        ApiUtil.fetchAll = function (entity, callback) {
            callback('mockdata');
        }
        CrudActions.fetchAll('mock');
        expect(store.dispatch).toBeCalledWith({
            type: actionTypeConstant.LIST,
            data: 'mockdata',
            entity: 'mock'
        });
    });

    it('calls delete function of ApiUtil', function () {
        var mock = function () {
        }
        CrudActions.deleteItem('mock', 3, 'mock');
        expect(ApiUtil.delete).toBeCalledWith('mock', 3, mock);
    });

    it('deletes data item before calling dispatch', function(){
        store.dispatch = jest.genMockFunction();
        ApiUtil.delete = function (entity, id, callback) {
            callback(id);
        }
        CrudActions.deleteItem('mock', 13, projectStatusArray);
        expect(projectStatusArray.length).toEqual(2);
    });

    it('calls dispatch function of store on successful deletion of data', function () {
        store.dispatch = jest.genMockFunction();
        ApiUtil.delete = function (entity, id, callback) {
            callback(id);
        }
        CrudActions.deleteItem('mock', 14, projectStatusArray);
        expect(store.dispatch).toBeCalledWith({
            type: actionTypeConstant.DELETE,
            data: projectStatusArray,
            entity: 'mock'
        });
    });



});
