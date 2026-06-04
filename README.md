# Cvedb SDK

Fast vulnerability lookups by CVE-ID, EUVD-ID, CPE 2.3, or product name, served by Shodan

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About CVEDB

CVEDB is a vulnerability-lookup service run by [Shodan](https://www.shodan.io). It exposes a small read-only HTTP API at `https://cvedb.shodan.io` for fetching CVE records, searching by product or CPE 2.3 string, and pulling the newest disclosures.

What you get from the API:

- Single-CVE lookup by identifier at `/cve/{CVE_ID}`
- Single-record lookup by EUVD identifier at `/euvd/{EUVD_ID}`
- Listing and filtering of CVEs at `/cves`, including filters for CPE 2.3 (`cpe23=`), product name (`product=`), known-exploited status (`is_kev=true`), and sorting by EPSS score (`sort_by_epss=true`)
- A CPE dictionary lookup at `/cpes?product=`
- Per-record fields typically include the CVE summary, CVSS score, EPSS risk score, affected product CPEs, references, and publication dates

Operational notes: no Shodan account or API key is required for the public endpoints. CORS is reported as disabled on the freepublicapis.com health check, so browser-side calls may need a proxy. Rate limits are not documented publicly.

## Try it

**TypeScript**
```bash
npm install cvedb
```

**Python**
```bash
pip install cvedb-sdk
```

**PHP**
```bash
composer require voxgig/cvedb-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/cvedb-sdk/go
```

**Ruby**
```bash
gem install cvedb-sdk
```

**Lua**
```bash
luarocks install cvedb-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CvedbSDK } from 'cvedb'

const client = new CvedbSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o cvedb-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "cvedb": {
      "command": "/abs/path/to/cvedb-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Cve** | A single CVE record with summary, CVSS/EPSS scores, affected CPEs, and references, fetched via `/cve/{CVE_ID}` or listed/filtered via `/cves`. | `/cve/{cve_id}` |
| **IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo** | CPE dictionary lookup for a given product, exposed at `/cpes?product={name}`, returning the matching CPE 2.3 strings. | `/cpes` |
| **ThisEndpointIsTailoredForSearchesBasedOnProductNameOr** | Product- and CPE-based CVE search at `/cves`, accepting `product=` or `cpe23=` query parameters (plus optional filters such as `is_kev=true` and `sort_by_epss=true`). | `/cves` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from cvedb_sdk import CvedbSDK

client = CvedbSDK({})


# Load a specific cve
cve, err = client.Cve(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'cvedb_sdk.php';

$client = new CvedbSDK([]);


// Load a specific cve
[$cve, $err] = $client->Cve(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/cvedb-sdk/go"

client := sdk.NewCvedbSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Cvedb_sdk"

client = CvedbSDK.new({})


# Load a specific cve
cve, err = client.Cve(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("cvedb_sdk")

local client = sdk.new({})


-- Load a specific cve
local cve, err = client:Cve(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CvedbSDK.test()
const result = await client.Cve().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CvedbSDK.test(None, None)
result, err = client.Cve(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CvedbSDK::test(null, null);
[$result, $err] = $client->Cve(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Cve(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CvedbSDK.test(nil, nil)
result, err = client.Cve(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Cve(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the CVEDB

- Upstream: [https://cvedb.shodan.io](https://cvedb.shodan.io)

- Free for non-commercial use, per the project homepage
- Commercial use requires an enterprise licence from [Shodan](https://www.shodan.io)
- No Shodan account or API key is needed to query the public endpoints
- Underlying CVE data originates from public vulnerability sources (NVD, EPSS, KEV, EUVD)

---

Generated from the CVEDB OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
