import {link} from "../src/fetch/util";

describe('link', () => {
	test('Verify result of Object argument', () => {
		expect(link('somedomain.com', {foo: 'bar'})).toEqual('somedomain.com?foo=bar');
	});
	test('Verify result of Array argument', () => {
		expect(link('somedomain.com', [['foo', 'bar']])).toEqual('somedomain.com?foo=bar');
	});
	test('Verify result of String argument', () => {
		expect(link('somedomain.com', 'foo=bar')).toEqual('somedomain.com?foo=bar');
	});
	test('Verify result of Map argument', () => {
		expect(link('somedomain.com', new Map([['foo', 'bar']]))).toEqual('somedomain.com?foo=bar');
	});
	test('Ensure incompatible types throw an error', () => {
		expect(() => {
			link('foobar', new Set(['foo', 'bar']));
			link(true, false);
			link(new Map([['a', 'b']]));
		}).toThrowError();
	});
});