import {isFunction} from "../src/fetch/util";


describe('isFunction', function() {
	test('Verify result of Function argument', function() {
		expect(isFunction(() => {
		})).toEqual(true);
		expect(isFunction(new Function())).toEqual(true);
	});
	test('Ensure non-Function values return false', function() {
		expect(isFunction('foobar')).toEqual(false);
		expect(isFunction(true)).toEqual(false);
	});
});