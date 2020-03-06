/** Converts an object to form data
 * @param {Object|Map} obj Value to check
 * @return {FormData} */
export const objToFormData = obj => {
	if(isMap(obj)) {
		obj = map2POJO(obj);
	}

	let a = new FormData();
	let formData = Object.entries(obj).reduce((acc, [name, value]) => {
		acc.append(name, value);
		return acc;
	}, a);

	return formData;
};

export function strCmpI(str1, str2) {
	return str1.localeCompare(str2, undefined, {sensitivity: 'base'}) === 0;
}

/** Determines if the provided variable is of type FormData.
 * @param {*} val Value to check
 * @return {boolean} */
export const isFormData = val => val instanceof FormData;

/** Determines if the provided variable is a Map.
 * @param {*} val Value to check
 * @return {boolean} */
export const isMap = val => val instanceof Map;

/** Determines if the provided variable is a Set.
 * @param {*} val Value to check
 * @return {boolean} */
export const isSet = val => val instanceof Set;

/** Converts a Map to a Plain Ol' Javascript Object (POJO)
 * @param {Map} map Map to convert
 * @return {boolean} */
export const map2POJO = map => {
	if(!isMap(map)) {
		throw new Error('map2POJO received an incompatible argument type. Expected Map.');
	}
	return [...map.entries()].reduce((obj, [key, value]) => Object.assign(obj, {[key]: value}), {});
};

/** Determines if the provided variable is a Plain Ol' Javascript Object (POJO).
 * @param {*} val Value to check
 * @return {boolean} */
export const isObject = val => (typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]');

/** Determines if the provided variable is a Function.
 * @param {*} val Value to check
 * @return {boolean} */
export const isFunction = val => typeof val === 'function';

/** Determines if the provided variable is a String.
 * @param {*} val Value to check
 * @return {boolean} */
export const isString = val => typeof val === 'string';

/** Determines if the provided variable is empty. Performs similarly to PHP's empty().
 * @param {*} val Value to check
 * @return {boolean} */
export const empty = val => (
	(([undefined, null, false, 0, '0', '']).indexOf(val) !== -1)
	|| (Array.isArray(val) && val.length === 0)
	|| (isObject(val) && Object.keys(val).length === 0)
	|| ((isMap(val) || isSet(val)) && val.size === 0)
);

export const isset = val => (typeof val !== undefined);

/**
 * Determines if an object has a key/property.
 * Equivalent to obj.hasOwnProperty(key)
 *
 * @param   {object|Map} obj Object
 * @param   {string} key      Key/property
 *
 * @returns {boolean} True if object has key, false otherwise
 */
export function hasProp(obj, key) {
	if(isObject(obj)) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	} else if(isMap(obj)) {
		return obj.has(key);
	}
	throw new Error("hasProp() was provided an object argument of an unsupported type.");
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
 * @param {array|Object} queryParams Query/GET params
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
		return (acc, [name, value]) => _build(acc, name, value);
	};

	if(isObject(queryParams)) {
		return Object.entries(queryParams).reduce(_reduce(true), []).join('&').replace(/%20/g, '+');
	} else if(Array.isArray(queryParams)) {
		return queryParams.reduce(_reduce(true), []).join('&').replace(/%20/g, '+');
	}
	throw Error("Bad type supplied to param()");
}

/** If `queryParams` is a string it will be assumed to be a valid URL and returned as-is.
 * @param {string} base
 * @param {string|Object} queryParams Query/GET params
 * @returns {string} URL
 */
export function link(base, queryParams = undefined) {
	if(!isString(base)) {
		throw new Error("base argument must be of type String.");
	}

	let url = base;
	if(isString(queryParams)) {
		url += `?${queryParams}`;
	} else if(isObject(queryParams) && Object.values(queryParams).length) {
		url += `?${param(queryParams)}`;
	} else if(Array.isArray(queryParams) && queryParams.length) {
		url += `?${param(queryParams)}`;
	} else if(isMap(queryParams)) {
		queryParams = map2POJO(queryParams);
		url += `?${param(queryParams)}`;
	}
	return url;
}