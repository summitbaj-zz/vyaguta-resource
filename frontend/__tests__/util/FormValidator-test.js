/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 2/21/16.
 */

jest.dontMock('../../src/js/util/FormValidator');

var formValidator = require('../../src/js/util/FormValidator');

var data = {
    title: "test"
};

var invalidData = {
    title: ""
};

describe('FormValidator', function() {

    it('returns true when the data is valid', function() {
        expect(formValidator.isValid(data)).toBe(true);
    });

    it('returns false when the data is not valid', function() {
        expect(formValidator.isValid(invalidData)).toBe(false);
    });

});
