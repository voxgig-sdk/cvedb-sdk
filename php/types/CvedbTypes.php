<?php
declare(strict_types=1);

// Typed models for the Cvedb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cve entity data model. */
class Cve
{
    public array $cpes;
    public string $cve_id;
    public mixed $cvss;
    public mixed $cvss_v2;
    public mixed $cvss_v3;
    public mixed $cvss_v4;
    public mixed $cvss_version;
    public mixed $epss;
    public ?string $id = null;
    public bool $kev;
    public mixed $propose_action = null;
    public string $published_time;
    public mixed $ranking_epss;
    public mixed $ransomware_campaign = null;
    public array $references;
    public mixed $summary;
}

/** Request payload for Cve#load. */
class CveLoadMatch
{
    public string $id;
}

/** IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity data model. */
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo
{
}

/** Request payload for IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo#load. */
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch
{
    public ?bool $count = null;
    public ?int $limit = null;
    public string $product;
    public ?int $skip = null;
}

/** ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity data model. */
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr
{
}

/** Request payload for ThisEndpointIsTailoredForSearchesBasedOnProductNameOr#load. */
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch
{
    public ?bool $count = null;
    public mixed $cpe23 = null;
    public mixed $end_date = null;
    public ?bool $is_kev = null;
    public ?int $limit = null;
    public mixed $product = null;
    public ?int $skip = null;
    public ?bool $sort_by_epss = null;
    public mixed $start_date = null;
}

