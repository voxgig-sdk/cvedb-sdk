# Cvedb PHP SDK



The PHP SDK for the Cvedb API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Cve()` — with named operations (`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/cvedb-sdk/releases](https://github.com/voxgig-sdk/cvedb-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'cvedb_sdk.php';

$client = new CvedbSDK();
```

### 3. Load a cve

```php
try {
    // load() returns the ENTITY — call data_get() for the Cve record (throws on error).
    $cve = $client->Cve()->load(["id" => "example_id"]);
    print_r($cve->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $ifyouhavethenameofaspecificsoftwareproductandwantto = $client->IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()->load(["product" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = CvedbSDK::test([
    "entity" => ["cve" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$cve = $client->Cve()->load(["id" => "test01"]);
print_r($cve->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CvedbSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CVEDB_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CvedbSDK

```php
require_once 'cvedb_sdk.php';
$client = new CvedbSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CvedbSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CvedbSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Cve` | `($data): CveEntity` | Create a Cve entity instance. |
| `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` | `($data): IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` | Create an IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity instance. |
| `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` | `($data): ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` | Create a ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$cve = $client->Cve();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cpes` | `array` | A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability. |
| `cve_id` | `string` | The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically. |
| `cvss` | `mixed` | The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v2` | `mixed` | The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v3` | `mixed` | The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v4` | `mixed` | The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_version` | `mixed` | The version of the CVSS used in the cvss field. |
| `epss` | `mixed` | The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days. |
| `id` | `string` |  |
| `kev` | `bool` | A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts. |
| `propose_action` | `mixed` | Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems. |
| `published_time` | `string` | The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone. |
| `ranking_epss` | `mixed` | This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities. |
| `ransomware_campaign` | `mixed` | Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture. |
| `references` | `array` | A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research. |
| `summary` | `mixed` | A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Cve record (throws on error).
$cve = $client->Cve()->load(["id" => "cve_id"]);
```


### IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

Create an instance: `$if_you_have_the_name_of_a_specific_software_product_and_want_to = $client->IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo record (throws on error).
$if_you_have_the_name_of_a_specific_software_product_and_want_to = $client->IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()->load(["product" => "product"]);
```


### ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

Create an instance: `$this_endpoint_is_tailored_for_searches_based_on_product_name_or = $client->ThisEndpointIsTailoredForSearchesBasedOnProductNameOr();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ThisEndpointIsTailoredForSearchesBasedOnProductNameOr record (throws on error).
$this_endpoint_is_tailored_for_searches_based_on_product_name_or = $client->ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()->load();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── cvedb_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`cvedb_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$ifyouhavethenameofaspecificsoftwareproductandwantto = $client->IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo();
$ifyouhavethenameofaspecificsoftwareproductandwantto->load(["product" => "example"]);

// $ifyouhavethenameofaspecificsoftwareproductandwantto->data_get() now returns the ifyouhavethenameofaspecificsoftwareproductandwantto data from the last load
// $ifyouhavethenameofaspecificsoftwareproductandwantto->match_get() returns the last match criteria
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
