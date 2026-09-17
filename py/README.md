# Cvedb Python SDK



The Python SDK for the Cvedb API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Cve()` — each
carrying a small, uniform set of operations (`load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/cvedb-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from cvedb_sdk import CvedbSDK

client = CvedbSDK()
```

### 3. Load a cve

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    cve = client.Cve().load({"id": "example_id"})
    print(cve)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    ifyouhavethenameofaspecificsoftwareproductandwantto = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo().load({"product": "example"})
    print(ifyouhavethenameofaspecificsoftwareproductandwantto)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CvedbSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
ifyouhavethenameofaspecificsoftwareproductandwantto = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo().load({"product": "example"})
# ifyouhavethenameofaspecificsoftwareproductandwantto contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CvedbSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CvedbSDK

```python
from cvedb_sdk import CvedbSDK

client = CvedbSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CvedbSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CvedbSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Cve` | `(data) -> CveEntity` | Create a Cve entity instance. |
| `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` | `(data) -> IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` | Create an IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity instance. |
| `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` | `(data) -> ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` | Create a ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `id` |  |
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

Create an instance: `cve = client.Cve()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpes` | `list` | A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability. |
| `cve_id` | `str` | The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically. |
| `cvss` | `Any` | The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v2` | `Any` | The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v3` | `Any` | The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v4` | `Any` | The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_version` | `Any` | The version of the CVSS used in the cvss field. |
| `epss` | `Any` | The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days. |
| `id` | `str` |  |
| `kev` | `bool` | A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts. |
| `propose_action` | `Any` | Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems. |
| `published_time` | `str` | The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone. |
| `ranking_epss` | `Any` | This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities. |
| `ransomware_campaign` | `Any` | Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture. |
| `references` | `list` | A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research. |
| `summary` | `Any` | A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English. |

#### Example: Load

```python
cve = client.Cve().load({"id": "cve_id"})
```


### IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

Create an instance: `if_you_have_the_name_of_a_specific_software_product_and_want_to = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
if_you_have_the_name_of_a_specific_software_product_and_want_to = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo().load({"product": "product"})
```


### ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

Create an instance: `this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr().load()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── cvedb_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`cvedb_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
ifyouhavethenameofaspecificsoftwareproductandwantto = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
ifyouhavethenameofaspecificsoftwareproductandwantto.load({"product": "example"})

# ifyouhavethenameofaspecificsoftwareproductandwantto.data_get() now returns the ifyouhavethenameofaspecificsoftwareproductandwantto data from the last load
# ifyouhavethenameofaspecificsoftwareproductandwantto.match_get() returns the last match criteria
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
