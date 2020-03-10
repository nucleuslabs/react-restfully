import {objToFormData} from "../src/fetch/util";

describe('objToFormData', () => {
	test("Confirm objToFormData returns correct data", () => {
		let fd = new FormData();
		fd.append('foo', 'bar');
		expect(objToFormData(new Map([['foo', 'bar']]))).toEqual(fd);
		expect(objToFormData({foo: 'bar'})).toEqual(fd);
	});
	test('Ensure incompatible types throw an error', () => {
		expect(() => {
			objToFormData('foobar');
			objToFormData([['foo', 'b a r']]);
			objToFormData(new Set(['foo', 'bar']));
		}).toThrowError('Wrong type supplied to objToFormData. Expected one of type ["Map", "Object"]');
	});
});