# Cvedb Golang SDK Reference

Complete API reference for the Cvedb Golang SDK.


## CvedbSDK

### Constructor

```go
func NewCvedbSDK(options map[string]any) *CvedbSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CvedbSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CvedbSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Cve(data map[string]any) CvedbEntity`

Create a new `Cve` entity instance. Pass `nil` for no initial data.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data map[string]any) CvedbEntity`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` entity instance. Pass `nil` for no initial data.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data map[string]any) CvedbEntity`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CveEntity

```go
cve := client.Cve(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpe` | `[]any` | Yes |  |
| `cve_id` | `string` | Yes |  |
| `cvss` | `any` | Yes |  |
| `cvss_v2` | `any` | Yes |  |
| `cvss_v3` | `any` | Yes |  |
| `cvss_v4` | `any` | Yes |  |
| `cvss_version` | `any` | Yes |  |
| `epss` | `any` | Yes |  |
| `kev` | `bool` | Yes |  |
| `propose_action` | `any` | No |  |
| `published_time` | `string` | Yes |  |
| `ranking_epss` | `any` | Yes |  |
| `ransomware_campaign` | `any` | No |  |
| `reference` | `[]any` | Yes |  |
| `summary` | `any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Cve(nil).Load(map[string]any{"id": "cve_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CveEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```go
if_you_have_the_name_of_a_specific_software_product_and_want_to := client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```go
this_endpoint_is_tailored_for_searches_based_on_product_name_or := client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCvedbSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

