// Typed models for the Cvedb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cve {
  cpe: any[]
  cve_id: string
  cvss: any
  cvss_v2: any
  cvss_v3: any
  cvss_v4: any
  cvss_version: any
  epss: any
  kev: boolean
  propose_action?: any
  published_time: string
  ranking_epss: any
  ransomware_campaign?: any
  reference: any[]
  summary: any
}

export interface CveLoadMatch {
  id: string
}

export interface IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo {
}

export interface IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch {
}

export interface ThisEndpointIsTailoredForSearchesBasedOnProductNameOr {
}

export interface ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch {
}

