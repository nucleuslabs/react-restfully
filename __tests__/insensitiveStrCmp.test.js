import {insensitiveStrCmp, map2POJO, param} from "../src/fetch/util";

describe('insensitiveStrCmp', () => {
	test("Ensure truthy values are truthy", () => {
		expect(insensitiveStrCmp('foo', 'fOO')).toBeTruthy();
		expect(insensitiveStrCmp('bar', 'bar')).toBeTruthy();
	});
	test('Ensure falsy values are falsy', () => {
		expect(insensitiveStrCmp('foo', 'fooO')).toBeFalsy();
		expect(insensitiveStrCmp('bAr', 'fooO')).toBeFalsy();
		expect(() => {
			insensitiveStrCmp('bAr', {});
		}).toThrowError('Wrong type supplied to insensitiveStrCmp. "String" expected');
	});
});