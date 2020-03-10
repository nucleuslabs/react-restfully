import {useEffect, useReducer} from "react";
import {fetchResultObject} from "../fetch/fetchBase";
import '../fetch/JSDoc/FetchOptionsTypeDef';
import {getHandler} from "../fetch/get";

/** Uses GET to fetchBase data.
 * @param {String} url
 * @param {FetchOptions} fetchOptions - Options to supply
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