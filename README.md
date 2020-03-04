# react-restfully
React Restfully is a set of React Hooks and their analogous vanilla JS functions that assist you in fetching data using the `fetch()` API.

_Version 1.0.0_

### Quickstart

[TOC]
 
## Hooks

---

#### usePost

##### Example

```jsx
function hello() {
	const {data, loading, error} = usePost('__URL__', {
		variables: {language: 'english'},
	});
	
	if(loading) return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
##### Function Signature

```jsx
usePost(
    url: String,
    fetchOptions: fetchOptions, 
    dependencies?: Array = []
): FetchResult
```
##### Params
##### `url`
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

##### `fetchOptions`
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`∣`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

##### `dependencies`
| PARAM          |      TYPE     |  DESCRIPTION                                                                                                                           |
|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `dependencies` |  `array`      | The array of dependencies to pass to React's `useEffect`'s second parameter. Used to determine when this hook is fired. Default: `[]`. |

##### `Result`
| PROPERTY    |      TYPE                 |  DESCRIPTION                            | 
|-------------|---------------------------|-----------------------------------------|
| `data`      | `object`∣`undefined` | Data returned from query                |
| `loading`   | `Boolean`                 | Whether or not query is ongoing         |
| `hasErrors` | `Boolean`                 | Whether or not errors have occurred     |
| `error`     | `object`∣`undefined` | Error returned. Defaults to `undefined` |
| `payload`   | `Object`                  | Data passed down                        |

---

#### useGet

##### Example

```jsx
function hello() {
	const {data, loading, error} = useGet('__URL__', {
		variables: {language: 'english'},
	});
	
	if(loading) return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
##### Function Signature

```jsx
useGet(
    url: String,
    fetchOptions?: fetchOptions = {},
    dependencies?: Array = []
): FetchResult
```
##### Params

##### `url`
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

##### `fetchOptions`
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`∣`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

##### `dependencies`
| PARAM          |      TYPE     |  DESCRIPTION                                                                                                                           |
|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `dependencies` |  `array`      | The array of dependencies to pass to React's `useEffect`'s second parameter. Used to determine when this hook is fired. Default: `[]`. |

##### `Result`
| PROPERTY    |      TYPE                 |  DESCRIPTION                            | 
|-------------|---------------------------|-----------------------------------------|
| `data`      | `object`∣`undefined` | Data returned from query                |
| `loading`   | `Boolean`                 | Whether or not query is ongoing         |
| `hasErrors` | `Boolean`                 | Whether or not errors have occurred     |
| `error`     | `object`∣`undefined` | Error returned. Defaults to `undefined` |
| `payload`   | `Object`                  | Data passed down                        |

---

#### useSubmit

##### Example

```jsx
function Hello() {
	const [loadGreeting, {called, loading, data}] = useSubmit('__URL__', {
		variables: {language: 'english'},
	});

	if(called && loading) return <p>Loading ...</p>
	if(!called) {
		return <button onClick={() => loadGreeting()}>Load greeting</button>
	}
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
##### Function Signature

```jsx
useSubmit(
    url: String,
    fetchOptions?: fetchOptions = {}
): [(function(): void), FetchResult]
```
##### Params

##### `url`
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

##### `fetchOptions`
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`∣`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

##### `dependencies`
| PARAM          |      TYPE     |  DESCRIPTION                                                                                                                           |
|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `dependencies` |  `array`        | The array of dependencies to pass to React's `useEffect`'s second parameter. Used to determine when this hook is fired. Default: `[]`. |

##### `Result`
| PROPERTY    |      TYPE                 |  DESCRIPTION                                | 
|-------------|---------------------------|---------------------------------------------|
| `data`      | `object`∣`undefined` | Data returned from query                    |
| `loading`   | `Boolean`                 | Whether or not query is ongoing             |
| `hasErrors` | `Boolean`                 | Whether or not errors have occurred         |
| `error`     | `object`∣`undefined` | Error returned. Defaults to `undefined`     |
| `payload`   | `Object`                  | Data passed down                            |
| `called`    | `Boolean`                 | Whether or not the function has been called |

## Vanilla JS

---

#### post

##### Example

```jsx
function App() {
	const [data, setData] = useState();
	useEffect(() => {
		post('https://gfgfsdagfsdagfsda.free.beeceptor.com/test', {
			variables: {language: 'english'},
		}).then(data => setData(data));
	}, []);

	if(typeof data === 'undefined') return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
##### Function Signature

```jsx
post(
    url: Object,
    fetchOptions: fetchOptions
): Promise
```
##### Params

##### `url`
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

##### `fetchOptions`
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`∣`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

---

#### get

##### Example

```jsx
function Hello() {
	const [data, setData] = useState();
	useEffect(() => {
		get('__URL__', {
			variables: {language: 'english'},
		}).then(data => setData(data));
	}, []);

	if(typeof data === 'undefined') return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
##### Function Signature

```jsx
get(
    url: Object,
    fetchOptions: fetchOptions
): Promise
```
##### Params

##### `url`
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

##### `fetchOptions`
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`∣`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `payload`     | `Object`∣`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |
