// Typed models for the Cvedb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Cve is the typed data model for the cve entity.
type Cve struct {
	Cpe []any `json:"cpe"`
	CveId string `json:"cve_id"`
	Cvss any `json:"cvss"`
	CvssV2 any `json:"cvss_v2"`
	CvssV3 any `json:"cvss_v3"`
	CvssV4 any `json:"cvss_v4"`
	CvssVersion any `json:"cvss_version"`
	Epss any `json:"epss"`
	Kev bool `json:"kev"`
	ProposeAction *any `json:"propose_action,omitempty"`
	PublishedTime string `json:"published_time"`
	RankingEpss any `json:"ranking_epss"`
	RansomwareCampaign *any `json:"ransomware_campaign,omitempty"`
	Reference []any `json:"reference"`
	Summary any `json:"summary"`
}

// CveLoadMatch is the typed request payload for Cve.LoadTyped.
type CveLoadMatch struct {
	Id string `json:"id"`
}

// IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo is the typed data model for the if_you_have_the_name_of_a_specific_software_product_and_want_to entity.
type IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo struct {
}

// IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch mirrors the if_you_have_the_name_of_a_specific_software_product_and_want_to fields as an all-optional match
// filter (Go analog of Partial<IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo>).
type IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch struct {
}

// ThisEndpointIsTailoredForSearchesBasedOnProductNameOr is the typed data model for the this_endpoint_is_tailored_for_searches_based_on_product_name_or entity.
type ThisEndpointIsTailoredForSearchesBasedOnProductNameOr struct {
}

// ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch mirrors the this_endpoint_is_tailored_for_searches_based_on_product_name_or fields as an all-optional match
// filter (Go analog of Partial<ThisEndpointIsTailoredForSearchesBasedOnProductNameOr>).
type ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
