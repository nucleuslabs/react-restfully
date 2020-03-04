import {isObject} from "../src/fetch/util";

describe('isObject', function() {
	test('Verify result of Object argument', function() {
		expect(isObject({foo: 'bar'})).toEqual(true);
		let foobar = [];
		foobar.x = 'asdf';
		expect(isObject(foobar)).toEqual(false);
	});
	test('Ensure non-Object values return false', function() {
		expect(isObject('foobar')).toEqual(false);
		expect(isObject(true)).toEqual(false);
		expect(isObject(new Set(['foo', 'bar']))).toEqual(false);
	});
});