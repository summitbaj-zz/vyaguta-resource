jest.dontMock('../../src/js/api-util/ApiUtil')
    .dontMock('superagent');
var ApiUtil = require('../../src/js/api-util/ApiUtil');
var projectStatus = {
    name:'abcd',
    id: 100
};

var PROJECT_STATUS = 'projectStatus';
var TIME_OUT_MESSAGE = 'Call time out.';
describe('ApiUtil', function() {
    it('fetches all data',function(){
        var test = false;
        var callback = function(){
            test = true;
        }

        ApiUtil.fetchAll(PROJECT_STATUS, callback);

        waitsFor(function() {
            if(test == true)
                return test;
        }, TIME_OUT_MESSAGE, 1000);

        runs(function() {
            expect(test).toBe(true);
        });
    });

    it('creates data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.create(PROJECT_STATUS, projectStatus, callback);

        waitsFor(function() {
            if(test)
                return test;
        }, TIME_OUT_MESSAGE, 1000);

        runs(function() {
            expect(test).toBe(true);
        });
    });

    it('fetches one data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.fetchById(PROJECT_STATUS, 100, callback);
        waitsFor(function() {
            if(test)
                return test;
        }, TIME_OUT_MESSAGE, 1000);

        runs(function() {
            expect(test).toBe(true);
        });
    });

    it('edits data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.edit(PROJECT_STATUS, projectStatus, 100, callback);

        waitsFor(function() {
            if(test)
                return test;
        }, TIME_OUT_MESSAGE, 1000);

        runs(function() {
            expect(test).toBe(true);
        });
    });
    it('deletes data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.delete(PROJECT_STATUS, 100, callback);

        waitsFor(function() {
            if(test)
                return test;
        }, TIME_OUT_MESSAGE, 1000);

        runs(function() {
            expect(test).toBe(true);
        });
    });
});
