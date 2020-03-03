const {DEFAULT_HEADERS} = require('../src/fetch/fetch').testables;
const {post} = require('../src/fetch/fetch');
const fetchMock = require('fetch-mock');

describe('post', function() {
	test('Verify post() returns data', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		expect(post(
			'http://example.com',
			{method: 'POST', ...DEFAULT_HEADERS},
		)).resolves.toEqual({data: 'yes'});
		fetchMock.resetBehavior();
	});
});