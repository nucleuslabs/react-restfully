import React from 'react';
import {render, waitFor} from "@testing-library/react";
import {useGet} from "../src";
import fetchMock from 'fetch-mock';

function TestComponent() {
	const {data, loading} = useGet('http://example.com');
	if(loading) return <p>Loading ...</p>;
	return <h1 data-testid="h1">{data.greeting.message}</h1>;
}

describe('useGet', () => {
	test('Verify useGet() hook behaves correctly', async() => {
		fetchMock.get('http://example.com', {greeting: {message: 'Hello, world!'}});
		let {getByTestId, getByText} = render(<TestComponent/>);
		await waitFor(() => getByText("Hello, world!"));
		expect((await getByTestId("h1")).textContent).toEqual('Hello, world!');
		fetchMock.resetBehavior();
	});
});