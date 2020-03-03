import {isFunction} from "../src/fetch/util";

const {thenHandlers} = require('../src/fetch/fetch').testables;

describe('fetchBase', function() {
	test('Verify thenHandlers return appropriate functions', () => {
		const [onSuccessFn, onErrorFn] = thenHandlers();
		expect(isFunction(onSuccessFn)).toEqual(true);
		expect(isFunction(onErrorFn)).toEqual(true);
	});
});