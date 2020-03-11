import {empty, isFormData, isFunction, isObject, isset, isString, insensitiveStrCmp} from "./util";
import {ResponseTypes} from "./objects/ResponseTypes";
import {DefaultHeaders} from "./objects/DefaultHeaders";
import {Transform} from "./objects/Transform";

/** Wrapper for post() and get()
 * @param {string} url
 * @param {Object} headers
 * @param {function} resolve
 * @param {function} reject
 * @param {FetchOptions} fetchOptions
 * @return {Promise} */
export function fetchBase(url, headers, resolve, reject, fetchOptions = {}) {
	return fetch(url, headers)
		.then(response => {
			if(!response.ok) {
				reject({
					hasErrors: true,
					error: {message: `${response.status}: ${response.statusText || 'Bad Request'}`}
				});
			} else {
				processResponse(response, fetchOptions.responseType)
					.then(
						success => {
							response.ok
								? resolve(success)
								: reject(success);
						},
						(err) => reject(err)
					);
			}
		})
		.catch(err => {
			console.error("An error occurred", err);
			reject(err);
		});
}

/** Used to determine how to process the
 * @param {Response|Object} response
 * @param {ResponseTypes|string} responseType
 * @return {Promise} */
export function processResponse(response, responseType = ResponseTypes.JSON) {
	switch(responseType) {
	case ResponseTypes.JSON:
		return response.json();
	case ResponseTypes.TEXT:
		return response.text();
	case ResponseTypes.ARRAY_BUFFER:
		return response.arrayBuffer();
	case ResponseTypes.BLOB:
		return response.blob();
	case ResponseTypes.FORM_DATA:
		return response.formData();
	default:
		throw new Error(`fetchOption.responseType value of '${responseType}' is invalid!`);
	}
}

/** Transforms payload into default types. Determined by headers['Content-Type']
 * @param {*} payload
 * @param {Headers} headers
 * @returns {*} Formatted payload data */
export function transformPayloadDefault(payload, headers) {
	const contentType = headers.get('content-type');
	if(contentType && !empty(payload)) {
		if(insensitiveStrCmp(contentType, 'application/json')) {
			payload = Transform.JSON(payload);
		} else if(insensitiveStrCmp(contentType, 'application/x-www-form-urlencoded')) {
			payload = Transform.URL_ENCODED(payload);
		} else if(insensitiveStrCmp(contentType, 'multi-part/form-encoded')) {
			payload = isFormData(payload)
				? payload
				: Transform.FORM_ENCODED(payload);
		}
	}
	return payload;
}

/** Default Fetch.then() parameters to supply.
 * To be used with {@see postHandler} and {@see getHandler}
 * @param {object} props={}
 * @returns {function[]}*/
export function thenHandlers({onCompleted, onError, payload, dispatch} = {}) {
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
			}
			if(isFunction(dispatch)) {
				/* istanbul ignore next */
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

/** Handles transformation of fetchOptions.payload (unless transform is set to FALSE).
 * @param {FetchOptions} fetchOptions
 * @returns {Object} Object containing the payload and headers */
export function handleRequestPayload(fetchOptions) {
	fetchOptions.headers = ((!empty(fetchOptions.headers) && new Headers(fetchOptions.headers)) || DefaultHeaders);
	if(fetchOptions.transform) {
		if(isFunction(fetchOptions.transform)) {
			fetchOptions.payload = fetchOptions.transform(fetchOptions.payload, fetchOptions.headers);
		} else {
			throw new Error('fetchOptions.transform has been provided the wrong type. Expected one of type ["function" | "Boolean"]');
		}
	}

	if(isString(fetchOptions.payload)) {
		fetchOptions.headers.set('Content-Length', fetchOptions.payload.length.toString());
	}

	return fetchOptions;
}

/** Returns the default object defined in fetchOptionsTypeDef.js.
 * @param {FetchOptions} fetchOptions
 * @return {FetchOptions} */
export function fetchOptionsObject({payload, headers, transform, onCompleted, onError, responseType} = {}) {
	// Set the headers
	if(empty(headers)) {
		headers = DefaultHeaders;
	} else if(isObject(headers)) {
		headers = new Headers(headers);
	} else if(!(headers instanceof Headers)) {
		throw new Error('Unknown parameter type supplied to fetchOptions.headers. Expected one of type ["Object" | "Headers"]. "');
	}

	return handleRequestPayload({
		payload: payload || {},
		headers: ((!empty(headers) && new Headers(headers)) || DefaultHeaders),
		responseType: responseType || ResponseTypes.JSON,
		transform: transform || transformPayloadDefault,
		onCompleted: onCompleted || undefined,
		onError: onError || undefined,
	});
}

/** Returns the default object defined in fetchResultObject.js.
 * @param {FetchResult|FetchOptions|Object} [fetchResultsOrOptions={}] Definition of the return object
 * @return {FetchResult}*/
export function fetchResultObject({loading, payload, called} = {}) {
	let result = {
		loading: loading || true,
		data: undefined,
		hasErrors: false,
		error: undefined,
		payload: payload || {},
	};

	if(isset(called)) {
		result.called = called;
	}

	return result;
}