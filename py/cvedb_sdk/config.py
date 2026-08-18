# Cvedb SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "cpes",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "cve_id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "cvss",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "cvss_v2",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "cvss_v3",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "cvss_v4",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "cvss_version",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "epss",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "kev",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "propose_action",
            "type": "`$ANY`",
          },
          {
            "name": "published_time",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ranking_epss",
            "req": True,
            "type": "`$ANY`",
          },
          {
            "name": "ransomware_campaign",
            "type": "`$ANY`",
          },
          {
            "name": "references",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "summary",
            "req": True,
            "type": "`$ANY`",
          },
        ],
        "name": "cve",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "cve_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1000,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "product",
                      "orig": "product",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "skip",
                      "orig": "skip",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "cpe23",
                      "orig": "cpe23",
                      "type": "`$ANY`",
                    },
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$ANY`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "is_kev",
                      "orig": "is_kev",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1000,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "product",
                      "orig": "product",
                      "type": "`$ANY`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "skip",
                      "orig": "skip",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "sort_by_epss",
                      "orig": "sort_by_epss",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$ANY`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
