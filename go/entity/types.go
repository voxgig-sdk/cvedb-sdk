// Typed models for the Cvedb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/cvedb-sdk/go/core"
)

// Cve is the typed data model for the cve entity.
type Cve struct {
	Cpes []any `json:"cpes"`
	CveId string `json:"cve_id"`
	Cvss any `json:"cvss"`
	CvssV2 any `json:"cvss_v2"`
	CvssV3 any `json:"cvss_v3"`
	CvssV4 any `json:"cvss_v4"`
	CvssVersion any `json:"cvss_version"`
	Epss any `json:"epss"`
	Id *string `json:"id,omitempty"`
	Kev bool `json:"kev"`
	ProposeAction *any `json:"propose_action,omitempty"`
	PublishedTime string `json:"published_time"`
	RankingEpss any `json:"ranking_epss"`
	RansomwareCampaign *any `json:"ransomware_campaign,omitempty"`
	References []any `json:"references"`
	Summary any `json:"summary"`
}

// CveLoadMatch is the typed request payload for Cve.LoadTyped.
type CveLoadMatch struct {
	Id string `json:"id"`
}

// IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo is the typed data model for the if_you_have_the_name_of_a_specific_software_product_and_want_to entity.
type IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo struct {
}

// IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch is the typed request payload for IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo.LoadTyped.
type IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch struct {
	Count *bool `json:"count,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Product string `json:"product"`
	Skip *int `json:"skip,omitempty"`
}

// ThisEndpointIsTailoredForSearchesBasedOnProductNameOr is the typed data model for the this_endpoint_is_tailored_for_searches_based_on_product_name_or entity.
type ThisEndpointIsTailoredForSearchesBasedOnProductNameOr struct {
}

// ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch is the typed request payload for ThisEndpointIsTailoredForSearchesBasedOnProductNameOr.LoadTyped.
type ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch struct {
	Count *bool `json:"count,omitempty"`
	Cpe23 *any `json:"cpe23,omitempty"`
	EndDate *any `json:"end_date,omitempty"`
	IsKev *bool `json:"is_kev,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Product *any `json:"product,omitempty"`
	Skip *int `json:"skip,omitempty"`
	SortByEpss *bool `json:"sort_by_epss,omitempty"`
	StartDate *any `json:"start_date,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
