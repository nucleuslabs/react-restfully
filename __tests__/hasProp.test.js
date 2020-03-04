import {hasProp} from "../src/fetch/util";

describe('hasProp', () =>{
	test('Verify if an plain JS object has a given property.', () =>{
		expect(hasProp({foo: 'bar'}, 'foo')).toEqual(true);
	});
	test('Verify if an plain JS object does not have a given property.', () =>{
		expect(hasProp({foo: 'bar'}, 'zip')).toEqual(false);
	});
	test('Verify if a Map has a given property.', () =>{
		expect(hasProp(new Map([['foo', 'bar']]), 'foo')).toEqual(true);
	});
	test('Ensure incompatible types throw an error', () =>{
		expect(() => {
			hasProp('foobar', 'zip');
			hasProp(true, 'zip');
			hasProp([], 'zip');
		}).toThrowError();
	});
});