import {isMap} from "../src/fetch/util";

describe('isMap', function() {
	test('Verify argument is a Map', function() {
		expect(isMap(new Map())).toEqual(true);
		expect(isMap(new Map([['foo', 'bar']]))).toEqual(true);
	});
	test('Verify argument is not a Map', function() {
		expect(isMap([['foo', 'bar']])).toEqual(false);
		expect(isMap([['foo', 'b a r']])).toEqual(false);
	});
});