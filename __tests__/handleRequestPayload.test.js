import {fetchOptionsObject, handleRequestPayload, transformPayloadDefault} from "../src/fetch/fetchBase";
import {empty} from "../src/fetch/util";
import {DefaultHeaders, ResponseTypes} from "../src";

describe('handleRequestPayload', () => {
	test('Ensure correct behavior of handleRequestPayload', () => {

		expect(() => {
			handleRequestPayload({
				transform: "foobar"
			});
		}).toThrowError();

		expect(handleRequestPayload({
			payload: "foobar"
		})).toEqual(handleRequestPayload({
			payload: "foobar",
			headers: DefaultHeaders
		}));

	});
});