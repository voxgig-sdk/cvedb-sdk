package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Cvedb",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://cvedb.shodan.io",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cve": map[string]any{},
				"if_you_have_the_name_of_a_specific_software_product_and_want_to": map[string]any{},
				"this_endpoint_is_tailored_for_searches_based_on_product_name_or": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cve": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cpes",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "cve_id",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cvss",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_v2",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_v3",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_v4",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_version",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "epss",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "kev",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "propose_action",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "published_time",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ranking_epss",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ransomware_campaign",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "references",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "summary",
						"req": true,
						"type": "`$ANY`",
					},
				},
				"name": "cve",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "cve_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cve/{cve_id}",
								"parts": []any{
									"cve",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"cve_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"if_you_have_the_name_of_a_specific_software_product_and_want_to": map[string]any{
				"fields": []any{},
				"name": "if_you_have_the_name_of_a_specific_software_product_and_want_to",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1000,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "product",
											"orig": "product",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cpes",
								"parts": []any{
									"cpes",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"product",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"this_endpoint_is_tailored_for_searches_based_on_product_name_or": map[string]any{
				"fields": []any{},
				"name": "this_endpoint_is_tailored_for_searches_based_on_product_name_or",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "cpe23",
											"orig": "cpe23",
											"type": "`$ANY`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$ANY`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "is_kev",
											"orig": "is_kev",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1000,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "product",
											"orig": "product",
											"type": "`$ANY`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "sort_by_epss",
											"orig": "sort_by_epss",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$ANY`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cves",
								"parts": []any{
									"cves",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"cpe23",
										"end_date",
										"is_kev",
										"limit",
										"product",
										"skip",
										"sort_by_epss",
										"start_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
