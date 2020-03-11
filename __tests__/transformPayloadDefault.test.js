import {transformPayloadDefault} from "../src/fetch/fetchBase";
import {Transform} from "../src/fetch/objects/Transform";

describe('handleRequestPayload', () => {
	test('Ensure correct behavior of handleRequestPayload', () => {

		expect(transformPayloadDefault("data", new Headers({"content-type": 'application/json'})))
			.toEqual(Transform.JSON("data"));

		expect(transformPayloadDefault({foo: 'bar'}, new Headers({"content-type": 'application/x-www-form-urlencoded'})))
			.toEqual(Transform.URL_ENCODED({foo: 'bar'}));


		let formData = new FormData();
		formData.append('foo', 'bar');
		expect(transformPayloadDefault({foo: 'bar'}, new Headers({"content-type": 'multi-part/form-encoded'})))
			.toEqual(formData);

	});
});