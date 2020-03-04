import {testables, getHandler} from "../src";
import fetchMock from 'fetch-mock';

const {DEFAULT_HEADERS} = testables;

describe('getHandler', () => {
	test('Verify get() returns data onCompleted', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		getHandler(
			'http://example.com',
			{
				method: 'GET',
				onCompleted: d => expect(d).toEqual({data: 'yes'}),
				...DEFAULT_HEADERS
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
				onError: err => expect(err).toEqual({message: 'Whoops, looks like something went wrong.'}),
				...DEFAULT_HEADERS
			},
		);
		fetchMock.resetBehavior();
	});
});