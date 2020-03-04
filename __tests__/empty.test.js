import {empty} from "../src/fetch/util";

describe('empty', () => {
	test('Verify result of truthy argument', () => {
		[undefined, null, false, 0, '0', '', [], {}, new Map(), new Set()]
			.forEach(val => expect(empty(val)).toEqual(true));
	});
	test('Verify result of falsy argument', () => {
		['undefined', 1, true, '1', 'string', ['foobar'], {foo: 'bar'}, new Map([['foo', 'bar']]), new Set(['foobar'])]
			.forEach(val => expect(empty(val)).toEqual(false));
	});
});