import {testables} from "../src";
import fetchMock from 'fetch-mock';

const {fetchBase, DEFAULT_HEADERS} = testables;

describe('fetchBase', function() {
	test('Verify fetchBase(POST) will resolve', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		expect(fetchBase(
			'http://example.com',
			{method: 'POST', ...DEFAULT_HEADERS},
			success => success,
			err => err
		)).resolves.toEqual({data: 'yes'});
	});
	test('Verify fetchBase(GET) will resolve', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		expect(fetchBase(
			'http://example.com',
			{method: 'GET', ...DEFAULT_HEADERS},
			success => success,
			err => err
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});