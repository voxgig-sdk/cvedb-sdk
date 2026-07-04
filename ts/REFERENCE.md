# Cvedb TypeScript SDK Reference

Complete API reference for the Cvedb TypeScript SDK.


## CvedbSDK

### Constructor

```ts
new CvedbSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CvedbSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CvedbSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CvedbSDK` instance in test mode.


### Instance Methods

#### `Cve(data?: object)`

Create a new `Cve` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CveEntity` instance.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data?: object)`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data?: object)`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CvedbSDK.test()`.

**Returns:** `CvedbSDK` instance in test mode.


---

## CveEntity

```ts
const cve = client.Cve()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpe` | ``$ARRAY`` | Yes |  |
| `cve_id` | ``$STRING`` | Yes |  |
| `cvss` | ``$ANY`` | Yes |  |
| `cvss_v2` | ``$ANY`` | Yes |  |
| `cvss_v3` | ``$ANY`` | Yes |  |
| `cvss_v4` | ``$ANY`` | Yes |  |
| `cvss_version` | ``$ANY`` | Yes |  |
| `epss` | ``$ANY`` | Yes |  |
| `kev` | ``$BOOLEAN`` | Yes |  |
| `propose_action` | ``$ANY`` | No |  |
| `published_time` | ``$STRING`` | Yes |  |
| `ranking_epss` | ``$ANY`` | Yes |  |
| `ransomware_campaign` | ``$ANY`` | No |  |
| `reference` | ``$ARRAY`` | Yes |  |
| `summary` | ``$ANY`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cve().load({ id: 'cve_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CveEntity` instance with the same client and
options.

#### `client()`

Return the parent `CvedbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```ts
const if_you_have_the_name_of_a_specific_software_product_and_want_to = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo().load({ id: 'if_you_have_the_name_of_a_specific_software_product_and_want_to_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same client and
options.

#### `client()`

Return the parent `CvedbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```ts
const this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr().load({ id: 'this_endpoint_is_tailored_for_searches_based_on_product_name_or_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same client and
options.

#### `client()`

Return the parent `CvedbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CvedbSDK({
  feature: {
    test: { active: true },
  }
})
```

