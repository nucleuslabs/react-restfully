import {useEffect, useReducer} from "react";
import {fetchResultObject, postHandler} from "../fetch/fetch";
import '../fetch/JSDoc/FetchOptionsTypeDef';

/** Uses POST. Similar to ajaxLoader().
 * @param {String} url
 * @param {FetchOptions} fetchOptions - Route value
 * @param {array} dependencies - array Used for second parameter of useEffect()
 * @returns {FetchResult}
 * */
export function usePost(url, fetchOptions, dependencies = []) {
	const [state, dispatch] = useReducer(
		(state, action) => Object.assign({}, state, action),
		fetchResultObject(fetchOptions)
	);

	useEffect(() => {
		postHandler(url, Object.assign({}, fetchOptions, {state, dispatch}));
	}, dependencies);

	return state;
}