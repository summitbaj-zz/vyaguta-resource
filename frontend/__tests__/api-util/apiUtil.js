/*
jest.dontMock('../../src/js/api-util/ApiUtil')
    .dontMock('superagent');
var ApiUtil = require('../../src/js/api-util/ApiUtil');
var projectStatus = {name:"abcd"};

describe('ApiUtil', function() {
    it('fetches all data',function(){
        var test = false;
        var callback = function(){
            test = true;
        }

        ApiUtil.fetchAll('projectStatus', callback);

        waitsFor(function() {
            if(test == true)
                return test;
        }, "The call timed out.", 5000);

        runs(function() {
            expect(test).toBe(true);
        });
    });

    it('fetches one data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.fetchById('projectStatus', 27, callback);
        waitsFor(function() {
            if(test)
                return test;
        }, "The call timed out.", 5000);

        runs(function() {
            expect(test).toBe(true);
        });
    });

    it('creates data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.create('projectStatus', projectStatus, callback);

        waitsFor(function() {
            if(test)
                return test;
        }, "The call timed out.", 5000);

        runs(function() {
            expect(test).toBe(true);
        });
    });

    it('edits data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.edit('projectStatus', projectStatus, 27, callback);

        waitsFor(function() {
            if(test)
                return test;
        }, "The call timed out.", 5000);

        runs(function() {
            expect(test).toBe(true);
        });
    });
    it('deletes data', function(){
        var test = false;
        var callback = function(){
            test = true;
        }
        ApiUtil.delete('projectStatus', 31, callback);

        waitsFor(function() {
            if(test)
                return test;
        }, "The call timed out.", 5000);

        runs(function() {
            expect(test).toBe(true);
        });
    });
});
*/
