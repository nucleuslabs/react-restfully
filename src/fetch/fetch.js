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
 * @param {Object} url To be used with {@see link}
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
 * @param url
 * @param {fetchOptions} fetchOptions
 * */
export function postHandler(url, fetchOptions) {
	const [success, error] = thenHandlers(fetchOptions);
	post(url, fetchOptions).then(success, error);
}

/** GET Fetch wrapper that behaves like postJson.
 * @param {Object} url To be used with {@see link}
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
 * @param url
 * @param {fetchOptions} fetchOptions
 * */
export function getHandler(url, fetchOptions) {
	const [success, error] = thenHandlers(fetchOptions);
	get(url, fetchOptions).then(success, error);
}

/** Default Fetch.then() parameters to supply.
 * To be used with {@see postHandler} and {@see getHandler}
 * @param {object} props
 * @returns {function[]}*/
function thenHandlers({onCompleted, onError, payload, dispatch}) {
	return ([
		success => {
			if(isFunction(onCompleted)) {
				onCompleted(success);
			}
			dispatch({
				loading: false,
				hasErrors: false,
				data: success,
				payload,
			});
		},
		err => {
			let errorRes = err || {message: 'Whoops, looks like something went wrong.'};
			dispatch({
				loading: false,
				hasErrors: true,
				error: errorRes,
				payload,
			});
			if(isFunction(onError)) {
				onError(errorRes);
			} else {
				console.error(errorRes)
			}
		}
	]);
}

export function fetchResultObject(fetchOptions) {
	let result = {
		loading: hasProp(fetchOptions, 'loading') ? fetchOptions.loading : true,
		data: undefined,
		hasErrors: false,
		error: undefined,
		payload: fetchOptions.payload || {},
	};
	if(hasProp(fetchOptions, 'called')) {
		result.called = fetchOptions.called;
	}
	return result;
}