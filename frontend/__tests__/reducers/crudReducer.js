jest.dontMock('../../src/js/reducers/crudReducer')
    .dontMock('immutable');

var crudReducer = require('../../src/js/reducers/crudReducer');
var Immutable = require('immutable');

describe('Crud Reducer', function () {
    it('gives initial state when null is passed as initial state', function () {
        var state = crudReducer(null, 'LIST');
        expect(state).toNotEqual(null);
    });

    it('returns correct state', function () {
        var state = crudReducer('mock', 'DELETE');
        expect(state).toEqual('mock');
    });
});
