import {isSet} from "../src/fetch/util";

describe('isMap', function() {
	test('Verify argument is a Set', function() {
		expect(isSet(new Set(['foo', 'bar']))).toEqual(true);
		expect(isSet(new Set())).toEqual(true);
	});
	test('Verify argument is not a Set', function() {
		expect(isSet([['foo', 'bar']])).toEqual(false);
		expect(isSet([['foo', 'b a r']])).toEqual(false);
	});
});