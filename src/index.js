// Fetch Hooks
const usePost = require("./hooks/usePost");
const useGet = require("./hooks/useGet");
const useSubmit = require("./hooks/useSubmit");

// Fetch JS (Promise-based functions)
const fetch = require("./fetch/fetch");

module.exports = {
	...usePost,
	...useGet,
	...useSubmit,
	...fetch
};