# Cvedb TypeScript SDK Reference

Complete API reference for the Cvedb TypeScript SDK.


## CvedbSDK

### Constructor

```ts
new CvedbSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CvedbSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CvedbSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CvedbSDK` instance in test mode.


### Instance Methods

#### `Cve(data?: object)`

Create a new `Cve` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CveEntity` instance.

#### `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(data?: object)`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance.

#### `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(data?: object)`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOr` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CvedbSDK.test()`.

**Returns:** `CvedbSDK` instance in test mode.


---

## CveEntity

```ts
const cve = client.Cve()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cpes` | `any[]` | Yes | A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability. |
| `cve_id` | `string` | Yes | The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically. |
| `cvss` | `any` | Yes | The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v2` | `any` | Yes | The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v3` | `any` | Yes | The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_v4` | `any` | Yes | The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack. |
| `cvss_version` | `any` | Yes | The version of the CVSS used in the cvss field. |
| `epss` | `any` | Yes | The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days. |
| `kev` | `boolean` | Yes | A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts. |
| `propose_action` | `any` | No | Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems. |
| `published_time` | `string` | Yes | The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone. |
| `ranking_epss` | `any` | Yes | This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities. |
| `ransomware_campaign` | `any` | No | Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture. |
| `references` | `any[]` | Yes | A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research. |
| `summary` | `any` | Yes | A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cve().load({ id: 'cve_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CveEntity` instance with the same client and
options.

#### `client()`

Return the parent `CvedbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity

```ts
const if_you_have_the_name_of_a_specific_software_product_and_want_to = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity` instance with the same client and
options.

#### `client()`

Return the parent `CvedbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity

```ts
const this_endpoint_is_tailored_for_searches_based_on_product_name_or = client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ThisEndpointIsTailoredForSearchesBasedOnProductNameOr().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity` instance with the same client and
options.

#### `client()`

Return the parent `CvedbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CvedbSDK({
  feature: {
    test: { active: true },
  }
})
```

