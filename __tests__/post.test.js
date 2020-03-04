import {post, testables} from "../src";
import fetchMock from 'fetch-mock';

const {DEFAULT_HEADERS} = testables;

describe('post', () => {
	test('Verify post() returns data', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		expect(post(
			'http://example.com',
			{method: 'POST', ...DEFAULT_HEADERS},
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});