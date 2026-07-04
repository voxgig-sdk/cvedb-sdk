# Cvedb Python SDK Reference

Complete API reference for the Cvedb Python SDK.


## CvedbSDK

### Constructor

```python
from cvedb_sdk import CvedbSDK

client = CvedbSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CvedbSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CvedbSDK.test()
```


### Instance Methods

#### `Cve(data=None)`

Create a new `CveEntity` instance. Pass `None` for no initial data.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data=None)`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance. Pass `None` for no initial data.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data=None)`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CveEntity

```python
cve = client.Cve()
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cve().load({"id": "cve_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CveEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```python
if_you_have_the_name_of_a_specific_software_product_and_want_to = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo().load({"id": "if_you_have_the_name_of_a_specific_software_product_and_want_to_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```python
this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr().load({"id": "this_endpoint_is_tailored_for_searches_based_on_product_name_or_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CvedbSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

