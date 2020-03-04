import {fetchResultObject} from "../src";

describe('fetchResultObject', () =>{
	test('Verify result of correct returned Object', () =>{
		expect(fetchResultObject({})).toEqual({
			loading: true,
			data: undefined,
			hasErrors: false,
			error: undefined,
			payload: {},
		});
		expect(fetchResultObject({called: true})).toEqual({
			loading: true,
			data: undefined,
			hasErrors: false,
			error: undefined,
			payload: {},
			called: true
		});
		expect(fetchResultObject({nonExistentKey: true})).toEqual({
			loading: true,
			data: undefined,
			hasErrors: false,
			error: undefined,
			payload: {},
		});
		expect(fetchResultObject()).toEqual({
			loading: true,
			data: undefined,
			hasErrors: false,
			error: undefined,
			payload: {},
		});
	});
});