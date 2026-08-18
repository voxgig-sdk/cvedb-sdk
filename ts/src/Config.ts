
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Cvedb',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://cvedb.shodan.io",

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
          "name": "cpes",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "cve_id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "cvss",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "cvss_v2",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "cvss_v3",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "cvss_v4",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "cvss_version",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "epss",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "kev",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "propose_action",
          "type": "`$ANY`"
        },
        {
          "name": "published_time",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ranking_epss",
          "req": true,
          "type": "`$ANY`"
        },
        {
          "name": "ransomware_campaign",
          "type": "`$ANY`"
        },
        {
          "name": "references",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "summary",
          "req": true,
          "type": "`$ANY`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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
              "args": {
                "query": [
                  {
                    "example": false,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1000,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "product",
                    "orig": "product",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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
              "args": {
                "query": [
                  {
                    "example": false,
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "cpe23",
                    "orig": "cpe23",
                    "type": "`$ANY`"
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$ANY`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "is_kev",
                    "orig": "is_kev",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1000,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "product",
                    "orig": "product",
                    "type": "`$ANY`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "skip",
                    "orig": "skip",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "sort_by_epss",
                    "orig": "sort_by_epss",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$ANY`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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

