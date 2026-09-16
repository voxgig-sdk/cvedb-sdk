-- Cvedb SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Cvedb",
      slug = "cvedb",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://cvedb.shodan.io",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["cve"] = {},
        ["if_you_have_the_name_of_a_specific_software_product_and_want_to"] = {},
        ["this_endpoint_is_tailored_for_searches_based_on_product_name_or"] = {},
      },
    },
    entity = {
      ["cve"] = {
        ["fields"] = {
          {
            ["name"] = "cpes",
            ["req"] = true,
            ["short"] = "A list of Common Platform Enumeration (CPE) identifiers that specify the affected product(s) or component(s) by this vulnerability.",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "cve_id",
            ["req"] = true,
            ["short"] = "The unique identifier assigned to a reported vulnerability, adhering to the CVE-YYYY-NNNNN format, which helps in tracking and referencing vulnerabilities systematically.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cvss",
            ["req"] = true,
            ["short"] = "The Common Vulnerability Scoring System (CVSS) score, newest version, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "cvss_v2",
            ["req"] = true,
            ["short"] = "The Common Vulnerability Scoring System (CVSS) score version 2, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "cvss_v3",
            ["req"] = true,
            ["short"] = "The Common Vulnerability Scoring System (CVSS) score version 3, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "cvss_v4",
            ["req"] = true,
            ["short"] = "The Common Vulnerability Scoring System (CVSS) score version 4, which ranges from 0 to 10, quantifies the severity of the vulnerability based on various factors such as exploitability, impact, and ease of attack.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "cvss_version",
            ["req"] = true,
            ["short"] = "The version of the CVSS used in the cvss field.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "epss",
            ["req"] = true,
            ["short"] = "The Exploit Prediction Scoring System (EPSS) score, a probabilistic measure between 0 and 1 (0 and 100%)., predicts the likelihood of a vulnerability being exploited in the wild within the next 30 days.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "kev",
            ["req"] = true,
            ["short"] = "A boolean value indicating whether the vulnerability is known to be exploited in the wild, which is crucial for prioritizing patching and mitigation efforts.",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "propose_action",
            ["short"] = "Suggested actions or mitigation strategies to address the vulnerability, aimed at reducing its impact or eliminating the risk to affected systems.",
            ["type"] = "`$ANY`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "published_time",
            ["req"] = true,
            ["short"] = "The date and time when the vulnerability was published, in the format YYYY-MM-DDTHH:MM:SS, with UTC time zone.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ranking_epss",
            ["req"] = true,
            ["short"] = "This score ranks the vulnerability in terms of its EPSS score relative to all other scored vulnerabilities.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "ransomware_campaign",
            ["short"] = "Indicates if the vulnerability has been exploited in ransomware campaigns, highlighting its significance and potential impact on security posture.",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "references",
            ["req"] = true,
            ["short"] = "A list of references providing further details, technical advisories, and mitigation guidance related to the vulnerability, facilitating deeper understanding and research.",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "summary",
            ["req"] = true,
            ["short"] = "A brief overview of the vulnerability, providing essential information on what it entails, the affected systems, and the potential impact in clear, understandable English.",
            ["type"] = "`$ANY`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "cve",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "cve_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cve/{cve_id}",
                ["rename"] = {
                  ["param"] = {
                    ["cve_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "cve",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "cve",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["if_you_have_the_name_of_a_specific_software_product_and_want_to"] = {
        ["fields"] = {},
        ["name"] = "if_you_have_the_name_of_a_specific_software_product_and_want_to",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = 1000,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "product",
                      ["orig"] = "product",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cpes",
                ["segments"] = {
                  {
                    ["lit"] = "cpes",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "limit",
                    "product",
                    "skip",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "cpes",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["this_endpoint_is_tailored_for_searches_based_on_product_name_or"] = {
        ["fields"] = {},
        ["name"] = "this_endpoint_is_tailored_for_searches_based_on_product_name_or",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "cpe23",
                      ["orig"] = "cpe23",
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "end_date",
                      ["orig"] = "end_date",
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "is_kev",
                      ["orig"] = "is_kev",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = 1000,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "product",
                      ["orig"] = "product",
                      ["type"] = "`$ANY`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = false,
                      ["kind"] = "query",
                      ["name"] = "sort_by_epss",
                      ["orig"] = "sort_by_epss",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "start_date",
                      ["orig"] = "start_date",
                      ["type"] = "`$ANY`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cves",
                ["segments"] = {
                  {
                    ["lit"] = "cves",
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "cves",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
