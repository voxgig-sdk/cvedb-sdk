# Cvedb Lua SDK



The Lua SDK for the Cvedb API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Cve()` — each with the same small set of operations (`load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

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
local cve, err = client:Cve():load({ id = "example_id" })
if err then error(err) end
print(cve)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local ifyouhavethenameofaspecificsoftwareproductandwantto, err = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
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

local result, err = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo():load()
-- result is the returned data; err is set on failure
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
| `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` | `(data) -> IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` | Create an IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity instance. |
| `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` | `(data) -> ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` | Create a ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local cve, err = client:Cve():load({ id = "example_id" })
    if err then error(err) end
    -- cve is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Cve

| Field | Description |
| --- | --- |
| `cpes` | A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability. |
| `cve_id` | The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically. |
| `cvss` | The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v2` | The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v3` | The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v4` | The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_version` | The version of the CVSS used in the cvss field. |
| `epss` | The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days. |
| `kev` | A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts. |
| `propose_action` | Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems. |
| `published_time` | The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone. |
| `ranking_epss` | This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities. |
| `ransomware_campaign` | Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture. |
| `references` | A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research. |
| `summary` | A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English. |

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

Create an instance: `local cve = client:Cve(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpes` | `table` | A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability. |
| `cve_id` | `string` | The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically. |
| `cvss` | `any` | The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v2` | `any` | The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v3` | `any` | The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v4` | `any` | The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_version` | `any` | The version of the CVSS used in the cvss field. |
| `epss` | `any` | The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days. |
| `kev` | `boolean` | A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts. |
| `propose_action` | `any` | Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems. |
| `published_time` | `string` | The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone. |
| `ranking_epss` | `any` | This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities. |
| `ransomware_campaign` | `any` | Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture. |
| `references` | `table` | A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research. |
| `summary` | `any` | A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English. |

#### Example: Load

```lua
local cve, err = client:Cve():load({ id = "cve_id" })
```


### IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

Create an instance: `local if_you_have_the_name_of_a_specific_software_product_and_want_to = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local if_you_have_the_name_of_a_specific_software_product_and_want_to, err = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo():load()
```


### ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

Create an instance: `local this_endpoint_is_tailored_for_searches_based_on_product_name_or = client:ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local this_endpoint_is_tailored_for_searches_based_on_product_name_or, err = client:ThisEndpointIsTailoredForSearchesBasedOnProductNameOr():load()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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
local ifyouhavethenameofaspecificsoftwareproductandwantto = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
ifyouhavethenameofaspecificsoftwareproductandwantto:load()

-- ifyouhavethenameofaspecificsoftwareproductandwantto:data_get() now returns the ifyouhavethenameofaspecificsoftwareproductandwantto data from the last load
-- ifyouhavethenameofaspecificsoftwareproductandwantto:match_get() returns the last match criteria
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
