import {processResponse} from "../src/fetch/fetchBase";
import {ResponseTypes} from "../src";

describe('processResponse', () => {
	test("Check different types for processResponse", () => {
		// Just for testing
		const response = {
			json:() => new Promise(()=>{}),
			text:() => new Promise(()=>{}),
			arrayBuffer:() => new Promise(()=>{}),
			blob:() => new Promise(()=>{}),
			formData:() => new Promise(()=>{}),
		};
		expect(processResponse(response, ResponseTypes.JSON) instanceof Promise).toBeTruthy();
		expect(processResponse(response, ResponseTypes.TEXT) instanceof Promise).toBeTruthy();
		expect(processResponse(response, ResponseTypes.ARRAY_BUFFER) instanceof Promise).toBeTruthy();
		expect(processResponse(response, ResponseTypes.BLOB) instanceof Promise).toBeTruthy();
		expect(processResponse(response, ResponseTypes.FORM_DATA) instanceof Promise).toBeTruthy();
	});
	test("Ensure error thrown on unknown response type", () => {
		expect(() => {
			processResponse({}, 'FOO_BAR');
		}).toThrowError();
	});
});