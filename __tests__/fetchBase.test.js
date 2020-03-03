const {fetchBase, DEFAULT_HEADERS} = require('../src/fetch/fetch').testables;
const fetchMock = require('fetch-mock');

describe('fetchBase', function() {
	test('Verify fetchBase(POST) is working', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		expect(fetchBase(
			'http://example.com',
			{method: 'POST', ...DEFAULT_HEADERS},
			success => success,
			err => err
		)).resolves.toEqual({data: 'yes'});
	});
	test('Verify fetchBase(GET) is working', () => {
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