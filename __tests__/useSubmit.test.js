import React, {useEffect, useState} from 'react';
import {render} from "@testing-library/react";
import {useSubmit} from "../src";
import fetchMock from 'fetch-mock';

function TestComponent() {
	const [testDone, setTestDone] = useState(false);
	const [loadGreeting, {called, loading, data}] = useSubmit('http://example.com', {
		onCompleted: () => setTestDone(true),
	});

	useEffect(() => {
		if(!called) {
			loadGreeting();
			setTestDone(true);
		}
	}, []);

	if(testDone) return <h1>Hello, world!</h1>;
	return <p>Loading...</p>;
}

describe('useSubmit', () => {
	test('Verify useSubmit() hook behaves correctly', async() => {
		fetchMock.post('http://example.com', {});
		let {getByText} = render(<TestComponent/>);
		expect((await getByText("Hello, world!")).textContent).toEqual('Hello, world!');
		fetchMock.resetBehavior();
	});
});