// Fetch Hooks
const usePost = require("./hooks/usePost");
const useGet = require("./hooks/useGet");
const useSubmit = require("./hooks/useSubmit");

// Fetch JS (Promise-based functions)
const fetch = require("./fetch/fetchBase");
const get = require("./fetch/get");
const post = require("./fetch/post");
const Transform = require("./fetch/objects/Transform");
const ResponseTypes = require("./fetch/objects/ResponseTypes");
const DefaultHeaders = require("./fetch/objects/DefaultHeaders");

module.exports = {
	...usePost,
	...useGet,
	...useSubmit,
	...fetch,
	...Transform,
	...ResponseTypes,
	...DefaultHeaders,
	...get,
	...post
};