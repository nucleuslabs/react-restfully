import {objToFormData, param} from "../util";

/** @enum {function} */
export const Transform = {
	JSON: p => JSON.stringify(p),
	URL_ENCODED: p => param(p),
	FORM_ENCODED: p => objToFormData(p)
};