import React from 'react';
import {render, wait} from "@testing-library/react";
import {usePost} from "../src";
import fetchMock from 'fetch-mock';

function TestComponent() {
	const {data, loading} = usePost('http://example.com', {
		variables: {language: 'english'},
	});
	if(loading) return <p>Loading ...</p>;
	return <h1 data-testid="h1">{data.greeting.message}</h1>;
}

describe('usePost', () => {
	test('Verify usePost() hook behaves correctly', async() => {
		fetchMock.post('http://example.com', {greeting: {message: 'Hello, world!'}});
		let {getByTestId, getByText} = render(<TestComponent/>);
		await wait(() => getByText("Hello, world!"));
		expect((await getByTestId("h1")).textContent).toEqual('Hello, world!');
		fetchMock.resetBehavior();
	});
});