# Cvedb PHP SDK Reference

Complete API reference for the Cvedb PHP SDK.


## CvedbSDK

### Constructor

```php
require_once __DIR__ . '/cvedb_sdk.php';

$client = new CvedbSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CvedbSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CvedbSDK::test();
```


### Instance Methods

#### `Cve($data = null)`

Create a new `CveEntity` instance. Pass `null` for no initial data.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo($data = null)`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance. Pass `null` for no initial data.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr($data = null)`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CvedbUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CveEntity

```php
$cve = $client->Cve();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpe` | `array` | Yes |  |
| `cve_id` | `string` | Yes |  |
| `cvss` | `mixed` | Yes |  |
| `cvss_v2` | `mixed` | Yes |  |
| `cvss_v3` | `mixed` | Yes |  |
| `cvss_v4` | `mixed` | Yes |  |
| `cvss_version` | `mixed` | Yes |  |
| `epss` | `mixed` | Yes |  |
| `kev` | `bool` | Yes |  |
| `propose_action` | `mixed` | No |  |
| `published_time` | `string` | Yes |  |
| `ranking_epss` | `mixed` | Yes |  |
| `ransomware_campaign` | `mixed` | No |  |
| `reference` | `array` | Yes |  |
| `summary` | `mixed` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Cve()->load(["id" => "cve_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CveEntity`

Create a new `CveEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```php
$if_you_have_the_name_of_a_specific_software_product_and_want_to = $client->IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```php
$this_endpoint_is_tailored_for_searches_based_on_product_name_or = $client->ThisEndpointIsTailoredForSearchesBasedOnProductNameOr();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CvedbSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

