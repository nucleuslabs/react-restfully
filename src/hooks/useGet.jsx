import {useEffect, useReducer} from "react";
import {fetchResultObject, getHandler} from "../fetch/fetch";
import '../fetch/FetchOptionsTypeDef';

/** Uses GET to fetch data.
 * @param {String} url
 * @param {fetchOptions} fetchOptions - Options to supply
 * @param {array} dependencies - Array to be used for second parameter of useEffect()
 * @returns {FetchResult}
 * */
export function useGet(url, fetchOptions = {}, dependencies = []) {
	const [state, dispatch] = useReducer(
		(state, action) => Object.assign({}, state, action),
		fetchResultObject(fetchOptions)
	);

	useEffect(() => {
		getHandler(url, Object.assign({}, fetchOptions, {state, dispatch}));
	}, dependencies);

	return state;
}