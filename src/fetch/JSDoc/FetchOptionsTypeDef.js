/**
 * Fetch Options.
 * @typedef {Object} FetchOptions
 * @property {Object|Headers} [headers=] - Headers (See fetchBase~DEFAULT_HEADERS)
 * @property {Object|Map|string} [payload=] - Data to pass down. (Note: Payload is appended to the URL for Get requests)
 * @property {function|undefined} [onCompleted=] - Callback on successful fetchBase
 * @property {function|undefined} [onError=] - Callback on failed fetchBase
 * @property {Transform|function|boolean} [transform=transformPayloadDefault()] - Overrides default formatting of payload. Setting to FALSE will prevent any transformation to payload. (Note that the Transform object contains default transformation operations).
 * @property {ResponseTypes} responseType - How to parse response body
 */

