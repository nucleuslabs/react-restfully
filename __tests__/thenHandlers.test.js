import {thenHandlers} from "../src";
import {isFunction} from "../src/fetch/util";

describe('fetchBase', () => {
	test('Verify thenHandlers returns [2] functions', () => {
		const [onSuccessFn, onErrorFn] = thenHandlers();
		expect(isFunction(onSuccessFn)).toEqual(true);
		expect(isFunction(onErrorFn)).toEqual(true);
	});
});