# react-restfully #

React Restfully is a set of React Hooks and their analogous vanilla JS functions that assist you in fetching data.

### What is this repository for? ###
* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Quickstart ###

* Hooks
* Vanilla JS
* Repo owner or admin
* Other community or team contact



 
### Hooks ###

---

##### usePost #####
###### Example ######

```jsx
function hello() {
	const {data, loading, error} = usePost('__URL__', {
		variables: {language: 'english'},
	});
	
	if(loading) return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
###### Function Signature ######

```jsx
usePost(
    url: String,
    fetchOptions: fetchOptions, 
    dependencies?: Array = []
): FetchResult
```
###### Params ######
###### `url` ######
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

###### `fetchOptions` ######
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`&#124;`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

###### `dependencies` ######
| PARAM          |      TYPE     |  DESCRIPTION                                                                                                                           |
|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `dependencies` |  `array`      | The array of dependencies to pass to React's `useEffect`'s second parameter. Used to determine when this hook is fired. Default: `[]`. |

###### `Result` ######
| PROPERTY    |      TYPE                 |  DESCRIPTION                            | 
|-------------|---------------------------|-----------------------------------------|
| `data`      | `object`&#124;`undefined` | Data returned from query                |
| `loading`   | `Boolean`                 | Whether or not query is ongoing         |
| `hasErrors` | `Boolean`                 | Whether or not errors have occurred     |
| `error`     | `object`&#124;`undefined` | Error returned. Defaults to `undefined` |
| `payload`   | `Object`                  | Data passed down                        |

---

##### useGet #####
###### Example ######

```jsx
function hello() {
	const {data, loading, error} = useGet('__URL__', {
		variables: {language: 'english'},
	});
	
	if(loading) return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
```
###### Function Signature ######

```jsx
useGet(
    url: String,
    fetchOptions?: fetchOptions = {},
    dependencies?: Array = []
): FetchResult
```
###### Params ######
###### `url` ######
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

###### `fetchOptions` ######
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`&#124;`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

###### `dependencies` ######
| PARAM          |      TYPE     |  DESCRIPTION                                                                                                                           |
|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `dependencies` |  `array`      | The array of dependencies to pass to React's `useEffect`'s second parameter. Used to determine when this hook is fired. Default: `[]`. |

###### `Result` ######
| PROPERTY    |      TYPE                 |  DESCRIPTION                            | 
|-------------|---------------------------|-----------------------------------------|
| `data`      | `object`&#124;`undefined` | Data returned from query                |
| `loading`   | `Boolean`                 | Whether or not query is ongoing         |
| `hasErrors` | `Boolean`                 | Whether or not errors have occurred     |
| `error`     | `object`&#124;`undefined` | Error returned. Defaults to `undefined` |
| `payload`   | `Object`                  | Data passed down                        |

---

##### useSubmit #####
###### Example ######

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
###### Function Signature ######

```jsx
useSubmit(
    url: String,
    fetchOptions?: fetchOptions = {}
): [(function(): void), FetchResult]
```
###### Params ######
###### `url` ######
| PARAM    |      TYPE     |  DESCRIPTION                  |
|----------|---------------|-------------------------------|
| `url`    |  string       | The URL to supply to `fetch()`|

###### `fetchOptions` ######
| OPTION        |      TYPE           |  DESCRIPTION                                                                 |
|---------------|---------------------|------------------------------------------------------------------------------|
| `headers`     | `array`             | Headers (See `fetch.DEFAULT_HEADERS`)                                        |
| `payload`     | `Object`&#124;`Map` | Data to pass down. (Note: `payload` is appended to the URL for Get requests) |
| `onCompleted` | `function`          | Callback on successful fetch                                                 |
| `onError`     | `function`          | Callback on failed fetch                                                     |

###### `dependencies` ######
| PARAM          |      TYPE     |  DESCRIPTION                                                                                                                           |
|----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `dependencies` |  `array`        | The array of dependencies to pass to React's `useEffect`'s second parameter. Used to determine when this hook is fired. Default: `[]`. |

###### `Result` ######
| PROPERTY    |      TYPE                 |  DESCRIPTION                                | 
|-------------|---------------------------|---------------------------------------------|
| `data`      | `object`&#124;`undefined` | Data returned from query                    |
| `loading`   | `Boolean`                 | Whether or not query is ongoing             |
| `hasErrors` | `Boolean`                 | Whether or not errors have occurred         |
| `error`     | `object`&#124;`undefined` | Error returned. Defaults to `undefined`     |
| `payload`   | `Object`                  | Data passed down                            |
| `called`    | `Boolean`                 | Whether or not the function has been called |
