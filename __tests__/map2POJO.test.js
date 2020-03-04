import {map2POJO} from "../src/fetch/util";

describe('map2POJO', function() {
	test("Verify conversion of Map to POJO (Plain Ol' Javascript Object)", function() {
		expect(map2POJO(new Map([['foo', 'bar'], ['zip', 'zap']]))).toEqual({foo: 'bar', zip: 'zap'});
		expect(map2POJO(new Map([['foo', 'b a r']]))).toEqual({foo: 'b a r'});
	});
	test('Ensure incompatible types throw an error', function() {
		expect(() => {
			param('foobar');
			param([['foo', 'b a r']]);
			param(new Set(['foo', 'bar']));
		}).toThrowError();
	});
});