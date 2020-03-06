import {objToFormData, param} from "./util";

/** @enum {string} */
export const Transform = {
	JSON: JSON.stringify,
	URL_ENCODED: param,
	FORM_ENCODED: objToFormData
};