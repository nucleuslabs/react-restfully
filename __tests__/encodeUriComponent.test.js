import {encodeUriComponent} from '../src/fetch/util';

describe('encodeUriComponent', function() {
	test('Encodes an URI Component', function() {
		expect(encodeUriComponent('foo bar')).toEqual('foo%20bar');
	});
	test("Ensure '.' and '..' throws an error", function() {
		expect(function() {
			encodeUriComponent('.');
			encodeUriComponent('..');
		}).toThrowError();
	});
});