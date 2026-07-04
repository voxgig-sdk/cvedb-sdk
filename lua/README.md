# Cvedb Lua SDK



The Lua SDK for the Cvedb API — an entity-oriented client using Lua conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/cvedb-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("cvedb_sdk")

local client = sdk.new()
```

### 3. Load a cve

```lua
local result, err = client:cve():load({ id = "example_id" })
if err then error(err) end
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:cve():load({ id = "test01" })
-- result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CVEDB_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### CvedbSDK

```lua
local sdk = require("cvedb_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CvedbSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Cve` | `(data) -> CveEntity` | Create a Cve entity instance. |
| `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` | `(data) -> IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` | Create a IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity instance. |
| `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` | `(data) -> ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` | Create a ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

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

Operations: Load.

API path: `/cve/{cve_id}`

#### IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/cpes`

#### ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

| Field | Description |
| --- | --- |

Operations: Load.

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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── cvedb_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`cvedb_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local cve = client:cve()
cve:load({ id = "example_id" })

-- cve:data_get() now returns the loaded cve data
-- cve:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
