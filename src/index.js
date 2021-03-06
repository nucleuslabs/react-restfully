// Fetch Hooks
const usePost = require("./hooks/usePost");
const useGet = require("./hooks/useGet");
const useSubmit = require("./hooks/useSubmit");

// Fetch JS
const {thenHandlers, fetchResultObject, fetchBase} = require("./fetch/fetchBase");
const {get, getHandler} = require("./fetch/get");
const {post, postHandler} = require("./fetch/post");

// Objects
const Transform = require("./fetch/objects/Transform");
const ResponseTypes = require("./fetch/objects/ResponseTypes");
const DefaultHeaders = require("./fetch/objects/DefaultHeaders");

module.exports = {
	// Hooks
	...usePost,
	...useGet,
	...useSubmit,

	// JS
	get,
	getHandler,
	post,
	postHandler,
	thenHandlers,
	fetchBase,
	fetchResultObject,
	...Transform,
	...ResponseTypes,
	...DefaultHeaders,
};