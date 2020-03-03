const {isString} = require('../src/fetch/util');

describe('isString', function() {
	test('Verify result of String argument', function() {
		expect(isString('')).toEqual(true);
		expect(isString('foobar')).toEqual(true);
	});
	test('Ensure non-String values return false', function() {
		expect(isString([])).toEqual(false);
		expect(isString(false)).toEqual(false);
		expect(isString(new Set(['foo', 'bar']))).toEqual(false);
	});
});