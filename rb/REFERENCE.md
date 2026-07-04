# Cvedb Ruby SDK Reference

Complete API reference for the Cvedb Ruby SDK.


## CvedbSDK

### Constructor

```ruby
require_relative 'cvedb_sdk'

client = CvedbSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CvedbSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CvedbSDK.test
```


### Instance Methods

#### `Cve(data = nil)`

Create a new `Cve` entity instance. Pass `nil` for no initial data.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data = nil)`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` entity instance. Pass `nil` for no initial data.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data = nil)`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CveEntity

```ruby
cve = client.Cve
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cve.load({ "id" => "cve_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CveEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```ruby
if_you_have_the_name_of_a_specific_software_product_and_want_to = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo.load({ "id" => "if_you_have_the_name_of_a_specific_software_product_and_want_to_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```ruby
this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr.load({ "id" => "this_endpoint_is_tailored_for_searches_based_on_product_name_or_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CvedbSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

