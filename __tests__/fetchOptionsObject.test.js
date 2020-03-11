import {fetchOptionsObject, transformPayloadDefault} from "../src/fetch/fetchBase";
import {DefaultHeaders, ResponseTypes} from "../src";

describe('fetchOptionsObject', () => {
	test('Verify result different parameter types', () => {
		let obj = {
			payload: {},
			headers: DefaultHeaders,
			responseType: ResponseTypes.JSON,
			transform: transformPayloadDefault,
			onCompleted: undefined,
			onError: undefined,
		};
		expect(fetchOptionsObject(obj)).toEqual(obj);

		obj.headers = {"content-type": 'application/JSON'};
		expect(fetchOptionsObject(obj)).toEqual({
			payload: {},
			headers: new Headers({"content-type": 'application/JSON'}),
			responseType: ResponseTypes.JSON,
			transform: transformPayloadDefault,
			onCompleted: undefined,
			onError: undefined,
		});

		obj.headers = new Set([1, 2, 3]);
		expect(() => {
			fetchOptionsObject(obj);
		}).toThrowError();

	});
});