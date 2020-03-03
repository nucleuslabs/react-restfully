import React from 'react';
import {render, fireEvent, wait, cleanup} from "@testing-library/react";

const {usePost} = require('../src/index');
const fetchMock = require('fetch-mock');

function TestComponent() {
	const {data, loading, error} = usePost('http://example.com', {
		variables: {language: 'english'},
	});
	if(loading) return <p>Loading ...</p>;
	return <h1 data-testid="h1">{data.greeting.message}</h1>;
}

describe('usePost', function() {
	test('Verify usePost() hook returns data', async() => {
		fetchMock.post('http://example.com', {greeting: {message: 'Hello, world!'}});
		let {findByTestId, getByTestId, toHaveTextContent, getByText, ...test} = render(<TestComponent/>);
		await wait(() => getByText("Hello, world!"));
		expect((await getByTestId("h1")).textContent).toEqual('Hello, world!');
		fetchMock.resetBehavior();
	});
});