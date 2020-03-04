import {encodeUriComponent} from '../src/fetch/util';

describe('encodeUriComponent', () => {
	test('Encodes an URI Component', () => {
		expect(encodeUriComponent('foo bar')).toEqual('foo%20bar');
	});
	test("Ensure '.' and '..' throws an error", () => {
		expect(() => {
			encodeUriComponent('.');
			encodeUriComponent('..');
		}).toThrowError();
	});
});