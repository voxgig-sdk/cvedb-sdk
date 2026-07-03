# Cvedb Lua SDK Reference

Complete API reference for the Cvedb Lua SDK.


## CvedbSDK

### Constructor

```lua
local sdk = require("cvedb_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Cve(data)`

Create a new `Cve` entity instance. Pass `nil` for no initial data.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data)`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` entity instance. Pass `nil` for no initial data.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data)`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CveEntity

```lua
local cve = client:Cve(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cve():load({ id = "cve_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CveEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```lua
local if_you_have_the_name_of_a_specific_software_product_and_want_to = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo():load({ id = "if_you_have_the_name_of_a_specific_software_product_and_want_to_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```lua
local this_endpoint_is_tailored_for_searches_based_on_product_name_or = client:ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ThisEndpointIsTailoredForSearchesBasedOnProductNameOr():load({ id = "this_endpoint_is_tailored_for_searches_based_on_product_name_or_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

