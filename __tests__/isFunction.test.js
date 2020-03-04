import {isFunction} from "../src/fetch/util";


describe('isFunction', () => {
	test('Verify result of Function argument', () => {
		expect(isFunction(() => {
		})).toEqual(true);
		expect(isFunction(new Function())).toEqual(true);
	});
	test('Ensure non-Function values return false', () => {
		expect(isFunction('foobar')).toEqual(false);
		expect(isFunction(true)).toEqual(false);
	});
});