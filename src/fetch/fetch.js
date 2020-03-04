import {hasProp, isFunction, link} from "./util";

/** Default headers to supply to fetch. Alternate headers can be provided through fetchOptions.headers*/
const DEFAULT_HEADERS = {
	"Accept": "application/json, text/javascript, */*; q=0.01",
	"Content-Type": "application/json",
	'X-Requested-With': 'XMLHttpRequest',
	'credentials': 'include',
	'mode': 'no-cors'
	//cache: 'only-if-cached' // *default, no-cache, reload, force-cache, only-if-cached
};

/** Wrapper for post() and get()
 * @param {string} url
 * @param {Object} headers
 * @param {function} resolve
 * @param {function} reject
 * @return {Promise} */
function fetchBase(url, headers, resolve, reject) {
	return fetch(url, headers)
		.then(resp =>
			resp.json().then(
				success => resp.ok
					? resolve(success)
					: reject(success),
				({responseJSON}) => reject(responseJSON)
			))
		.catch(err => {
			console.error("An error occurred", err);
			reject(err);
		});
}


/** POST Fetch wrapper that behaves like postJson.
 * @param {String} url To be used with {@see link}
 * @param {fetchOptions} fetchOptions To be passed as through body
 * @return {Promise}
 * */
export function post(url, fetchOptions) {
	const {payload, headers} = fetchOptions;
	return new Promise((resolve, reject) =>
		fetchBase(link(url), {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: headers || DEFAULT_HEADERS
		}, resolve, reject));
}

/** POST wrapper with additional functionality.
 * Does not return a promise. Loading state management can be done for you by providing `loading` and `setLoading()`.
 * @param {String} url
 * @param {fetchOptions} fetchOptions
 * */
export function postHandler(url, fetchOptions) {
	const [success, error] = thenHandlers(fetchOptions);
	post(url, fetchOptions).then(success, error);
}

/** GET Fetch wrapper that behaves like postJson.
 * @param {String} url To be used with {@see link}
 * @param {fetchOptions} fetchOptions data To be built into GET params
 * @return {Promise}
 * */
export function get(url, fetchOptions) {
	const {payload, headers} = fetchOptions;
	return new Promise((resolve, reject) =>
		fetchBase(link(url, payload), {
			method: 'GET',
			headers: headers || DEFAULT_HEADERS
		}, resolve, reject));
}

/** GET wrapper with additional functionality. Does not return a promise.
 * Loading state management can be done for you by providing `loading` and `setLoading()`.
 * @param {String} url
 * @param {fetchOptions} fetchOptions
 * */
export function getHandler(url, fetchOptions) {
	const [success, error] = thenHandlers(fetchOptions);
	get(url, fetchOptions).then(success, error);
}

/** Default Fetch.then() parameters to supply.
 * To be used with {@see postHandler} and {@see getHandler}
 * @param {object} props={}
 * @returns {function[]}*/
function thenHandlers({onCompleted, onError, payload, dispatch} = {}) {
	return ([
		success => {
			if(isFunction(onCompleted)) {
				onCompleted(success);
			}
			if(isFunction(dispatch)) {
				dispatch({
					loading: false,
					hasErrors: false,
					data: success,
					payload,
				});
			}
		},
		err => {
			let errorRes = err || {message: 'Whoops, looks like something went wrong.'};
			if(isFunction(onError)) {
				onError(errorRes);
			} else {
				throw new Error(errorRes);
			}
			if(isFunction(dispatch)) {
				dispatch({
					loading: false,
					hasErrors: true,
					error: errorRes,
					payload,
				});
			}
		}
	]);
}

/** Returns the default object defined in fetchResultObject.js.
 * @param {FetchResult} fetchResults
 * @return {FetchResult}*/
export function fetchResultObject(fetchResults = {}) {
	let result = {
		loading: hasProp(fetchResults, 'loading') ? fetchResults.loading : true,
		data: undefined,
		hasErrors: false,
		error: undefined,
		payload: fetchResults.payload || {},
	};
	if(hasProp(fetchResults, 'called')) {
		result.called = fetchResults.called;
	}
	return result;
}

/** Exports that are only used in testing */
export const testables = {
	DEFAULT_HEADERS,
	fetchBase,
	thenHandlers
};