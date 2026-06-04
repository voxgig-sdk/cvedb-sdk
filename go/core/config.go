package core

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
						"name": "cpe",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "cve_id",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "cvss",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "cvss_v2",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "cvss_v3",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "cvss_v4",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "cvss_version",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "epss",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "kev",
						"req": true,
						"type": "`$BOOLEAN`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "propose_action",
						"req": false,
						"type": "`$ANY`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "published_time",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "ranking_epss",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "ransomware_campaign",
						"req": false,
						"type": "`$ANY`",
						"active": true,
						"index$": 12,
					},
					map[string]any{
						"name": "reference",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 13,
					},
					map[string]any{
						"name": "summary",
						"req": true,
						"type": "`$ANY`",
						"active": true,
						"index$": 14,
					},
				},
				"name": "cve",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"example": 1000,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "product",
											"orig": "product",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "cpe23",
											"orig": "cpe23",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "is_kev",
											"orig": "is_kev",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"example": 1000,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "product",
											"orig": "product",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "sort_by_epss",
											"orig": "sort_by_epss",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": false,
											"type": "`$ANY`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
