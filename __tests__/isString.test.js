import {isString} from "../src/fetch/util";

describe('isString', () => {
	test('Verify result of String argument', () => {
		expect(isString('')).toEqual(true);
		expect(isString('foobar')).toEqual(true);
		expect(isString(new String('I Like Cheese'))).toEqual(true);
		expect(isString('true')).toEqual(true);
		expect(isString('123')).toEqual(true);
	});
	test('Ensure non-String values return false', () => {
		expect(isString([])).toEqual(false);
		expect(isString(false)).toEqual(false);
		expect(isString(new Set(['foo', 'bar']))).toEqual(false);
		expect(isString(true)).toEqual(false);
		expect(isString(123)).toEqual(false);
		expect(isString(10e1)).toEqual(false);
	});
});