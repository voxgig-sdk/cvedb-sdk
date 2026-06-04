# Cvedb SDK configuration

module CvedbConfig
  def self.make_config
    {
      "main" => {
        "name" => "Cvedb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://cvedb.shodan.io",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "cve" => {},
          "if_you_have_the_name_of_a_specific_software_product_and_want_to" => {},
          "this_endpoint_is_tailored_for_searches_based_on_product_name_or" => {},
        },
      },
      "entity" => {
        "cve" => {
          "fields" => [
            {
              "name" => "cpe",
              "req" => true,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "cve_id",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "cvss",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "cvss_v2",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "cvss_v3",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "cvss_v4",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "cvss_version",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "epss",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "kev",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "propose_action",
              "req" => false,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "published_time",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "ranking_epss",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "ransomware_campaign",
              "req" => false,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "reference",
              "req" => true,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 13,
            },
            {
              "name" => "summary",
              "req" => true,
              "type" => "`$ANY`",
              "active" => true,
              "index$" => 14,
            },
          ],
          "name" => "cve",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "cve_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cve/{cve_id}",
                  "parts" => [
                    "cve",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "cve_id" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "if_you_have_the_name_of_a_specific_software_product_and_want_to" => {
          "fields" => [],
          "name" => "if_you_have_the_name_of_a_specific_software_product_and_want_to",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
                      },
                      {
                        "example" => 1000,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "product",
                        "orig" => "product",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cpes",
                  "parts" => [
                    "cpes",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                      "limit",
                      "product",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "this_endpoint_is_tailored_for_searches_based_on_product_name_or" => {
          "fields" => [],
          "name" => "this_endpoint_is_tailored_for_searches_based_on_product_name_or",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "cpe23",
                        "orig" => "cpe23",
                        "reqd" => false,
                        "type" => "`$ANY`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "reqd" => false,
                        "type" => "`$ANY`",
                        "active" => true,
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "is_kev",
                        "orig" => "is_kev",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
                      },
                      {
                        "example" => 1000,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "product",
                        "orig" => "product",
                        "reqd" => false,
                        "type" => "`$ANY`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "sort_by_epss",
                        "orig" => "sort_by_epss",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "reqd" => false,
                        "type" => "`$ANY`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cves",
                  "parts" => [
                    "cves",
                  ],
                  "select" => {
                    "exist" => [
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CvedbFeatures.make_feature(name)
  end
end
