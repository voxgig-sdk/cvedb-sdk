# Cvedb TypeScript SDK



The TypeScript SDK for the Cvedb API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/cvedb-sdk/releases](https://github.com/voxgig-sdk/cvedb-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CvedbSDK } from '@voxgig-sdk/cvedb'

const client = new CvedbSDK()
```

### 3. Load a cve

```ts
const result = await client.cve.load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CvedbSDK.test()

const result = await client.cve.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new CvedbSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.cve

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CvedbSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CVEDB_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### CvedbSDK

#### Constructor

```ts
new CvedbSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Cve(data?)` | `CveEntity` | Create a Cve entity instance. |
| `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data?)` | `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` | Create a IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity instance. |
| `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data?)` | `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` | Create a ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity instance. |
| `tester(testopts?, sdkopts?)` | `CvedbSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CvedbSDK.test(testopts?, sdkopts?)` | `CvedbSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CvedbSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Cve

| Field | Description |
| --- | --- |
| `cpe` |  |
| `cve_id` |  |
| `cvss` |  |
| `cvss_v2` |  |
| `cvss_v3` |  |
| `cvss_v4` |  |
| `cvss_version` |  |
| `epss` |  |
| `kev` |  |
| `propose_action` |  |
| `published_time` |  |
| `ranking_epss` |  |
| `ransomware_campaign` |  |
| `reference` |  |
| `summary` |  |

Operations: load.

API path: `/cve/{cve_id}`

#### IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

| Field | Description |
| --- | --- |

Operations: load.

API path: `/cpes`

#### ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

| Field | Description |
| --- | --- |

Operations: load.

API path: `/cves`



## Entities


### Cve

Create an instance: `const cve = client.cve`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpe` | ``$ARRAY`` |  |
| `cve_id` | ``$STRING`` |  |
| `cvss` | ``$ANY`` |  |
| `cvss_v2` | ``$ANY`` |  |
| `cvss_v3` | ``$ANY`` |  |
| `cvss_v4` | ``$ANY`` |  |
| `cvss_version` | ``$ANY`` |  |
| `epss` | ``$ANY`` |  |
| `kev` | ``$BOOLEAN`` |  |
| `propose_action` | ``$ANY`` |  |
| `published_time` | ``$STRING`` |  |
| `ranking_epss` | ``$ANY`` |  |
| `ransomware_campaign` | ``$ANY`` |  |
| `reference` | ``$ARRAY`` |  |
| `summary` | ``$ANY`` |  |

#### Example: Load

```ts
const cve = await client.cve.load({ id: 'cve_id' })
```


### IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

Create an instance: `const if_you_have_the_name_of_a_specific_software_product_and_want_to = client.if_you_have_the_name_of_a_specific_software_product_and_want_to`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const if_you_have_the_name_of_a_specific_software_product_and_want_to = await client.if_you_have_the_name_of_a_specific_software_product_and_want_to.load({ id: 'if_you_have_the_name_of_a_specific_software_product_and_want_to_id' })
```


### ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

Create an instance: `const this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.this_endpoint_is_tailored_for_searches_based_on_product_name_or`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const this_endpoint_is_tailored_for_searches_based_on_product_name_or = await client.this_endpoint_is_tailored_for_searches_based_on_product_name_or.load({ id: 'this_endpoint_is_tailored_for_searches_based_on_product_name_or_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
cvedb/
├── src/
│   ├── CvedbSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CvedbSDK } from '@voxgig-sdk/cvedb'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const cve = client.cve
await cve.load({ id: "example_id" })

// cve.data() now returns the loaded cve data
// cve.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
