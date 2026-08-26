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
			"slug": "cvedb",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "cve_id",
						"req": true,
						"short": "The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cvss",
						"req": true,
						"short": "The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_v2",
						"req": true,
						"short": "The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_v3",
						"req": true,
						"short": "The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_v4",
						"req": true,
						"short": "The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "cvss_version",
						"req": true,
						"short": "The version of the CVSS used in the cvss field.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "epss",
						"req": true,
						"short": "The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "kev",
						"req": true,
						"short": "A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "propose_action",
						"short": "Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "published_time",
						"req": true,
						"short": "The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ranking_epss",
						"req": true,
						"short": "This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ransomware_campaign",
						"short": "Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture.",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "references",
						"req": true,
						"short": "A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "summary",
						"req": true,
						"short": "A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English.",
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
