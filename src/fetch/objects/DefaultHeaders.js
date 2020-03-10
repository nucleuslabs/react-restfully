/** @type Headers
 * Default headers to supply to fetchBase. Alternate headers can be provided through fetchOptions.headers*/
export const DefaultHeaders = new Headers({
	"Accept": "application/json, text/javascript, */*; q=0.01",
	"Content-Type": "application/json",
	'X-Requested-With': 'XMLHttpRequest',
	'credentials': 'include',
	'mode': 'cors'
	//cache: 'only-if-cached' // *default, no-cache, reload, force-cache, only-if-cached
});
