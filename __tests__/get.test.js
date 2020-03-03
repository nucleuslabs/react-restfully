const {DEFAULT_HEADERS} = require('../src/fetch/fetch').testables;
const {get} = require('../src/fetch/fetch');
const fetchMock = require('fetch-mock');

describe('post', function() {
	test('Verify get() returns data', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		expect(get(
			'http://example.com',
			{method: 'GET', ...DEFAULT_HEADERS},
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});