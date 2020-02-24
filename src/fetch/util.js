/**
 * Determines if an object has a key/property.
 * Equivalent to obj.hasOwnProperty(key)
 *
 * @param   {object} obj Object
 * @param   {string} key      Key/property
 *
 * @returns {boolean} True if object has key, false otherwise
 */
export function hasProp(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Encodes a URI-component. Errors if that component is "." or ".." as these cannot be escpaed.
 *
 * @param {string} str String the encode
 * @returns {string} URI-encoded string
 */
export function encodeUriComponent(str) {
	if(str === '.' || str === '..') {
		throw new Error(`Cannot URI-encode "${str}" per RFC 3986 §6.2.2.3`);
	}
	return encodeURIComponent(str);
}

/** Create a serialized representation of a plain object or an array.
 * Behaves similarly to jQuery.param() {@see: https://api.jquery.com/jQuery.param/}
 *
 * <b>Note</b>:
 * Object values of type array are handled different than `jQuery.param()`.<br/>
 * <ul>
 *     <li><code>param({foo: [1,2,3]}) = 'foo=1%2C2%2C3'</code></li>
 *     <li><code>$.param({foo: [1,2,3]}) = 'foo%5B%5D=1&foo%5B%5D=2&foo%5B%5D=3'</code></li>
 * </ul>
 * @param {array|object} queryParams Query/GET params
 * @return {string} URL parameters
 */
export function param(queryParams) {
	// Generates functions to be used
	const _reduce = isObj => {
		const _build = (acc, name, value) => {
			acc.push(`${encodeUriComponent(name)}=${encodeUriComponent(value)}`);
			return acc;
		};

		// Return the appropriate function (parameters)
		return isObj
			? (acc, [name, value]) => _build(acc, name, value) // To use with Object.entries() [[name,value],...]
			: (acc, {name, value}) => _build(acc, name, value); // Legacy: handle objects like [{name: '', value: ''}]
	};

	if(isObject(queryParams)) {
		return Object.entries(queryParams).reduce(_reduce(true), []).join('&').replace(/%20/g, '+');
	} else if(Array.isArray(queryParams)) {
		return queryParams.reduce(_reduce(false), []).join('&').replace(/%20/g, '+');
	} else {
		throw Error("Bad type supplied to param()");
	}
}

/**
 * If `queryParams` is a string it will be assumed to be a valid URL and returned as-is.
 * @param base
 * @param {string|Object} queryParams Query/GET params
 * @returns {string} URL
 */
export function link(base, queryParams = undefined) {
	let url = base;
	if(isString(queryParams)) {
		url += `?${queryParams}`;
	} else if(isObject(queryParams) && Object.values(queryParams).length) {
		url += `?${param(queryParams)}`;
	}
	return url;
}

export const isObject = val => typeof val === 'object';
export const isFunction = val => typeof val === 'function';
export const isString = val => typeof val === 'string';
export const empty = val => (
	(([undefined, null, false, 0, '0', '']).indexOf(val) !== -1)
	|| (Array.isArray(val) && val.length === 0)
	|| (typeof val === 'object' && Object.keys(val).length === 0)
);
