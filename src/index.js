// Fetch Hooks
const usePost = require("./hooks/usePost");
const useGet = require("./hooks/useGet");
const useSubmit = require("./hooks/useSubmit");

// Fetch JS (Promise-based functions)
const fetch = require("./fetch/fetch");
const Transform = require("./fetch/Transform");
const ResponseTypes = require("./fetch/ResponseTypes");
const DefaultHeaders = require("./fetch/DefaultHeaders");

module.exports = {
	...usePost,
	...useGet,
	...useSubmit,
	...fetch,
	...Transform,
	...ResponseTypes,
	...DefaultHeaders,
};