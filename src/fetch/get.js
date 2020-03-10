import {link} from "./util";
import {fetchBase, fetchOptionsObject, thenHandlers} from "./fetchBase";

/** GET Fetch wrapper that behaves like postJson.
 * @param {String} url To be used with {@see link}
 * @param {FetchOptions} fetchOptions data To be built into GET params
 * @return {Promise}
 * */
export function get(url, fetchOptions) {
	fetchOptions = fetchOptionsObject(fetchOptions);

	return new Promise((resolve, reject) =>
		fetchBase(link(url, fetchOptions.payload), {
			method: 'GET',
			headers: fetchOptions.headers
		}, resolve, reject, fetchOptions));
}

/** (To be used with React Hooks) GET wrapper with additional functionality. Does not return a promise.
 * Loading state management can be done for you by providing `loading` and `setLoading()`.
 * @param {String} url
 * @param {FetchOptions} fetchOptions
 * */
export function getHandler(url, fetchOptions) {
	const [success, error] = thenHandlers(fetchOptions);
	get(url, fetchOptions).then(success, error);
}