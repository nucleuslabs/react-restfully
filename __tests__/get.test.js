import {DefaultHeaders, get} from "../src";
import fetchMock from 'fetch-mock';

describe('post', () => {
	test('Verify get() will resolve', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		expect(get(
			'http://example.com',
			{method: 'GET', headers: DefaultHeaders},
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});