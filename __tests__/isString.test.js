import {isString} from "../src/fetch/util";

describe('isString', () => {
	test('Verify result of String argument', () => {
		expect(isString('')).toEqual(true);
		expect(isString('foobar')).toEqual(true);
	});
	test('Ensure non-String values return false', () => {
		expect(isString([])).toEqual(false);
		expect(isString(false)).toEqual(false);
		expect(isString(new Set(['foo', 'bar']))).toEqual(false);
	});
});