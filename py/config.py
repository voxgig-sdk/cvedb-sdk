# Cvedb SDK configuration


def make_config():
    return {
        "main": {
            "name": "Cvedb",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://cvedb.shodan.io",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "cve": {},
                "if_you_have_the_name_of_a_specific_software_product_and_want_to": {},
                "this_endpoint_is_tailored_for_searches_based_on_product_name_or": {},
            },
        },
        "entity": {
      "cve": {
        "fields": [
          {
            "active": True,
            "name": "cpe",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "cve_id",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "cvss",
            "req": True,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "cvss_v2",
            "req": True,
            "type": "`$ANY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "cvss_v3",
            "req": True,
            "type": "`$ANY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "cvss_v4",
            "req": True,
            "type": "`$ANY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "cvss_version",
            "req": True,
            "type": "`$ANY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "epss",
            "req": True,
            "type": "`$ANY`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "kev",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "propose_action",
            "req": False,
            "type": "`$ANY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "published_time",
            "req": True,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "ranking_epss",
            "req": True,
            "type": "`$ANY`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "ransomware_campaign",
            "req": False,
            "type": "`$ANY`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "reference",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "summary",
            "req": True,
            "type": "`$ANY`",
            "index$": 14,
          },
        ],
        "name": "cve",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "cve_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cve/{cve_id}",
                "parts": [
                  "cve",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "cve_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "if_you_have_the_name_of_a_specific_software_product_and_want_to": {
        "fields": [],
        "name": "if_you_have_the_name_of_a_specific_software_product_and_want_to",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": 1000,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "product",
                      "orig": "product",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "skip",
                      "orig": "skip",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cpes",
                "parts": [
                  "cpes",
                ],
                "select": {
                  "exist": [
                    "count",
                    "limit",
                    "product",
                    "skip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "this_endpoint_is_tailored_for_searches_based_on_product_name_or": {
        "fields": [],
        "name": "this_endpoint_is_tailored_for_searches_based_on_product_name_or",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cpe23",
                      "orig": "cpe23",
                      "reqd": False,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "reqd": False,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "is_kev",
                      "orig": "is_kev",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": 1000,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "product",
                      "orig": "product",
                      "reqd": False,
                      "type": "`$ANY`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "skip",
                      "orig": "skip",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "sort_by_epss",
                      "orig": "sort_by_epss",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": False,
                      "type": "`$ANY`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cves",
                "parts": [
                  "cves",
                ],
                "select": {
                  "exist": [
                    "count",
                    "cpe23",
                    "end_date",
                    "is_kev",
                    "limit",
                    "product",
                    "skip",
                    "sort_by_epss",
                    "start_date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
