import {DefaultHeaders, getHandler, post} from "../src";
import fetchMock from 'fetch-mock';

describe('getHandler', () => {
	test('Verify get() returns data onCompleted', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		getHandler(
			'http://example.com',
			{
				method: 'GET',
				onCompleted: d => expect(d).toEqual({data: 'yes'}),
				headers: DefaultHeaders
			},
		);
		fetchMock.resetBehavior();
	});
	test('Verify get() returns data onError', () => {
		fetchMock.get('http://example.com', 404);
		getHandler(
			'http://example.com',
			{
				method: 'GET',
				onError: err => expect(err).toBeTruthy(),
				headers: DefaultHeaders
			},
		);
		fetchMock.resetBehavior();
	});
});