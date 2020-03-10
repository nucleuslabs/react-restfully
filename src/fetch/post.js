import {link} from "./util";
import {fetchBase, fetchOptionsObject, thenHandlers} from "./fetchBase";

/** POST Fetch wrapper that behaves like postJson.
 * @param {String} url To be used with {@see link}
 * @param {FetchOptions} fetchOptions To be passed as through body
 * @return {Promise}
 * */
export function post(url, fetchOptions) {
	fetchOptions = fetchOptionsObject(fetchOptions);

	return new Promise((resolve, reject) =>
		fetchBase(link(url), {
			method: 'POST',
			body: fetchOptions.payload,
			headers: fetchOptions.headers
		}, resolve, reject, fetchOptions));
}

/** (To be used with React Hooks) POST wrapper with additional functionality.
 * Does not return a promise. Loading state management can be done for you by providing `loading` and `setLoading()`.
 * @param {String} url
 * @param {FetchOptions} fetchOptions
 * */
export function postHandler(url, fetchOptions) {
	const [success, error] = thenHandlers(fetchOptions);
	post(url, fetchOptions).then(success, error);
}