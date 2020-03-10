/**
 * Possible response types. Used to determine how to handle the response returned from fetch call.
 * @enum {string}
 */
export const ResponseTypes = {
	JSON: 'JSON', // uses response.json()
	TEXT: 'TEXT', // uses response.text()
	ARRAY_BUFFER: 'ARRAY_BUFFER', // uses response.arrayBuffer()
	BLOB: 'BLOB', // uses response.blob()
	FORM_DATA: 'FORM_DATA', // uses response.formData()
};
