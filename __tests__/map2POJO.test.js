import {map2POJO} from "../src/fetch/util";

describe('map2POJO', () => {
	test("Verify conversion of Map to POJO (Plain Ol' Javascript Object)", () => {
		expect(map2POJO(new Map([['foo', 'bar'], ['zip', 'zap']]))).toEqual({foo: 'bar', zip: 'zap'});
		expect(map2POJO(new Map([['foo', 'b a r']]))).toEqual({foo: 'b a r'});
	});
	test('Ensure incompatible types throw an error', () => {
		expect(() => {
			map2POJO('foobar');
			map2POJO([['foo', 'b a r']]);
			map2POJO(new Set(['foo', 'bar']));
		}).toThrowError('map2POJO received an incompatible argument type. Expected Map.');
	});
});