import {useReducer} from "react";
import {fetchResultObject, postHandler} from "../fetch/fetch";
import '../fetch/FetchOptionsTypeDef';
import {hasProp} from "../fetch/util";

/** Uses useLateEffect to implement a submit hook. Behaves similarly to usePost().
 * @param {String} url
 * @param {fetchOptions} fetchOptions
 * @returns {[function():void, FetchResult]} - Array containing [submitFunction, fetchResults]
 * */
export function useSubmit(url, fetchOptions = {}) {
	const [state, dispatch] = useReducer(
		(state, action) => Object.assign({}, state, action),
		fetchResultObject(Object.assign(fetchOptions, {loading: false, called: false}))
	);

	const submit = (fetchOptionsAlt = {}) => {
		if(!state.loading) {
			dispatch({loading: true, called: true});
			if(hasProp(fetchOptionsAlt, 'payload')) {
				fetchOptions.payload = fetchOptionsAlt.payload;
			}
			postHandler(url, Object.assign({}, fetchOptions, {state, dispatch}));
		}
	};

	return [submit, state];
}