import {isMap} from "../src/fetch/util";

describe('isMap', () => {
	test('Verify argument is a Map', () => {
		expect(isMap(new Map())).toEqual(true);
		expect(isMap(new Map([['foo', 'bar']]))).toEqual(true);
	});
	test('Verify argument is not a Map', () => {
		expect(isMap([['foo', 'bar']])).toEqual(false);
		expect(isMap([['foo', 'b a r']])).toEqual(false);
	});
});