import {testables, get} from "../src";
import fetchMock from 'fetch-mock';

const {DEFAULT_HEADERS} = testables;

describe('post', () => {
	test('Verify get() will resolve', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		expect(get(
			'http://example.com',
			{method: 'GET', ...DEFAULT_HEADERS},
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});