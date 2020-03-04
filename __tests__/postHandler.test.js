import {postHandler, testables} from "../src";
import fetchMock from 'fetch-mock';

const {DEFAULT_HEADERS} = testables;

describe('postHandler', () => {
	test('Verify post() returns data onCompleted', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		postHandler(
			'http://example.com',
			{
				method: 'POST',
				onCompleted: d => expect(d).toEqual({data: 'yes'}),
				...DEFAULT_HEADERS
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
				onError: err => expect(err).toEqual({message: 'Whoops, looks like something went wrong.'}),
				...DEFAULT_HEADERS
			},
		);
		fetchMock.resetBehavior();
	});
});