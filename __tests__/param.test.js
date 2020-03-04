import {param} from "../src/fetch/util";

describe('param', function() {
	test('Verify result of Array argument', function() {
		expect(param([['foo', 'bar'], ['zip', 'zap']])).toEqual('foo=bar&zip=zap');
		expect(param([['foo', 'b a r']])).toEqual('foo=b+a+r');
	});
	test('Verify result of Object argument', function() {
		expect(param({foo: 'bar', zip: 'zap'})).toEqual('foo=bar&zip=zap');
		expect(param({foo: 'b a r'})).toEqual('foo=b+a+r');
	});
	test('Ensure incompatible types throw an error', function() {
		expect(() => {
			param('foobar', 'zip');
			param(true, 'zip');
			param(new Set(['foo', 'bar']));
		}).toThrowError();
	});
});