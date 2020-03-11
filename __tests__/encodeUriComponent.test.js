import {encodeUriComponent} from '../src/fetch/util';

describe('encodeUriComponent', () => {
	test('Encodes an URI Component', () => {
		expect(encodeUriComponent('foo bar')).toEqual('foo%20bar');

		// Reserved Characters
		expect(encodeURIComponent(";,/?:@&=+$")).toEqual('%3B%2C%2F%3F%3A%40%26%3D%2B%24');
		// Unescaped Characters
		expect(encodeURIComponent("-_.!~*'()")).toEqual("-_.!~*'()");
		// Number Sign
		expect(encodeURIComponent("#")).toEqual('%23');
		// Alphanumeric Characters + Space
		expect(encodeURIComponent("ABC abc 123")).toEqual('ABC%20abc%20123');


	});
	test("Ensure '.' and '..' throws an error", () => {
		expect(() => {
			encodeUriComponent('.');
			encodeUriComponent('..');
		}).toThrowError();
	});

	// Note that a URIError will be thrown if one attempts to encode a surrogate which is not part of a high-low pair, e.g.,
	test("Ensure URIErrors are still thrown (when applicable)", () => {
		expect(encodeURIComponent('\uD800\uDFFF')).toEqual("%F0%90%8F%BF");
		expect(() => {
			encodeURIComponent('\uD800');
			encodeURIComponent('\uDFFF');
		}).toThrowError();
	});
});