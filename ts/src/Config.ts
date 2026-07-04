
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://cvedb.shodan.io',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      cve: {
      },

      if_you_have_the_name_of_a_specific_software_product_and_want_to: {
      },

      this_endpoint_is_tailored_for_searches_based_on_product_name_or: {
      },

    }
  }


  entity = {
    "cve": {
      "fields": [
        {
          "active": true,
          "name": "cpe",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "cve_id",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "cvss",
          "req": true,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "cvss_v2",
          "req": true,
          "type": "`$ANY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "cvss_v3",
          "req": true,
          "type": "`$ANY`",
          "index$": 4
        },
        {
          "active": true,
          "name": "cvss_v4",
          "req": true,
          "type": "`$ANY`",
          "index$": 5
        },
        {
          "active": true,
          "name": "cvss_version",
          "req": true,
          "type": "`$ANY`",
          "index$": 6
        },
        {
          "active": true,
          "name": "epss",
          "req": true,
          "type": "`$ANY`",
          "index$": 7
        },
        {
          "active": true,
          "name": "kev",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 8
        },
        {
          "active": true,
          "name": "propose_action",
          "req": false,
          "type": "`$ANY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "published_time",
          "req": true,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "ranking_epss",
          "req": true,
          "type": "`$ANY`",
          "index$": 11
        },
        {
          "active": true,
          "name": "ransomware_campaign",
          "req": false,
          "type": "`$ANY`",
          "index$": 12
        },
        {
          "active": true,
          "name": "reference",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 13
        },
        {
          "active": true,
          "name": "summary",
          "req": true,
          "type": "`$ANY`",
          "index$": 14
        }
      ],
      "name": "cve",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "cve_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "method": "GET",
              "orig": "/cve/{cve_id}",
              "parts": [
                "cve",
                "{id}"
              ],
              "rename": {
                "param": {
                  "cve_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1000,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "product",
                    "orig": "product",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/cpes",
              "parts": [
                "cpes"
              ],
              "select": {
                "exist": [
                  "count",
                  "limit",
                  "product",
                  "skip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
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
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "cpe23",
                    "orig": "cpe23",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "is_kev",
                    "orig": "is_kev",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1000,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "product",
                    "orig": "product",
                    "reqd": false,
                    "type": "`$ANY`"
                  },
                  {
                    "active": true,
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "sort_by_epss",
                    "orig": "sort_by_epss",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$ANY`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/cves",
              "parts": [
                "cves"
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
                  "start_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

