import {post, DefaultHeaders} from "../src";
import fetchMock from 'fetch-mock';

describe('post', () => {
	test('Verify post() returns data', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		expect(post(
			'http://example.com',
			{headers: DefaultHeaders},
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});