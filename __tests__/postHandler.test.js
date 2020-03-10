import {postHandler, DefaultHeaders} from "../src";
import fetchMock from 'fetch-mock';

describe('postHandler', () => {
	test('Verify post() returns data onCompleted', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		postHandler(
			'http://example.com',
			{
				method: 'POST',
				onCompleted: d => expect(d).toEqual({data: 'yes'}),
				headers: DefaultHeaders
			},
		);
		fetchMock.resetBehavior();
	});
	test('Verify post() returns data onError', () => {
		fetchMock.post('http://example.com', 404);
		postHandler(
			'http://example.com',
			{
				method: 'POST',
				onError: err => expect(err).toBeTruthy(),
				headers: DefaultHeaders
			},
		);
		fetchMock.resetBehavior();
	});
});