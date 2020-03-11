import {fetchBase, DefaultHeaders} from "../src";
import fetchMock from 'fetch-mock';

describe('fetchBase', () => {

	test('Verify fetchBase(POST) will resolve', () => {
		fetchMock.post('http://example.com', {data: 'yes'});
		(new Promise((resolve, reject) => {
			fetchBase(
				'http://example.com',
				{method: 'POST', headers: DefaultHeaders},
				resolve,
				reject
			);
		})).then(a => expect(a).toEqual({data: 'yes'}));
		fetchMock.resetBehavior();
	});

	test('Verify fetchBase(GET) will resolve', () => {
		fetchMock.get('http://example.com', {data: 'yes'});
		(new Promise((resolve, reject) => {
			fetchBase(
				'http://example.com',
				{method: 'GET', headers: DefaultHeaders},
				resolve,
				reject
			);
		})).then(a => expect(a).toEqual({data: 'yes'}));
		fetchMock.resetBehavior();
	});


	test('fetchBase(POST) will reject', () => {
		fetchMock.get('http://example.com', 404);
		let a = (new Promise((resolve, reject) => {
			fetchBase(
				'http://example.com',
				{method: 'GET', headers: DefaultHeaders},
				resolve,
				reject
			);
		}));
		a.then(a => console.log({a}), b => {
			expect(b).toEqual({hasErrors: true, error: {message: '404: Not Found'}});
		});
		fetchMock.resetBehavior();
	});
});