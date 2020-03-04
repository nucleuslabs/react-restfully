import React from 'react';
import {render, fireEvent, wait} from "@testing-library/react";
import {useSubmit} from "../src";
import fetchMock from 'fetch-mock';

function TestComponent() {
	const [loadGreeting, {called, loading, data}] = useSubmit('http://example.com', {
		variables: {language: 'english'},
	});

	if(called && loading) return <p>Loading ...</p>;
	if(!called) {
		return <button onClick={() => loadGreeting()}>Load greeting</button>;
	}
	return <h1 data-testid="h1">{data.greeting.message}</h1>;
}

describe('useSubmit', () => {
	test('Verify useSubmit() hook behaves correctly', async() => {
		fetchMock.post('http://example.com', {greeting: {message: 'Hello, world!'}});
		let {getByTestId, getByText} = render(<TestComponent/>);
		fireEvent.click(getByText("Load greeting"));
		await wait(() => getByText("Hello, world!"));
		expect((await getByTestId("h1")).textContent).toEqual('Hello, world!');
		fetchMock.resetBehavior();
	});
});