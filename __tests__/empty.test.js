const {empty} = require('../src/fetch/util');

describe('empty', function() {
	test('Verify result of truth-ey argument', function() {
		[undefined, null, false, 0, '0', '', [], {}, new Map(), new Set()]
			.forEach(val => expect(empty(val)).toEqual(true));
	});
	test('Verify result of falsey argument', function() {
		['undefined', 1, true, '1', 'string', ['foobar'], {foo: 'bar'}, new Map([['foo', 'bar']]), new Set(['foobar'])]
			.forEach(val => expect(empty(val)).toEqual(false));
	});
});