/**
 * usePost/useGet return object
 * @typedef {Object} FetchResult
 * @property {Object|undefined} data - Data returned from query
 * @property {Boolean} loading=true - Whether or not query is ongoing
 * @property {Boolean} hasErrors=false - Whether or not errors have occurred
 * @property {Object|undefined} error - Error returned. Defaults to `undefined`
 * @property {Object} payload={} - Data passed down
 * @property {Boolean} called=false - Whether or not the function has been called. (Only set for useSubmit).
 */
