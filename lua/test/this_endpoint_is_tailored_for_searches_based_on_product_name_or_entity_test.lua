-- ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("cvedb_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("ThisEndpointIsTailoredForSearchesBasedOnProductNameOrEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = this_endpoint_is_tailored_for_searches_based_on_product_name_or_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "this_endpoint_is_tailored_for_searches_based_on_product_name_or." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.this_endpoint_is_tailored_for_searches_based_on_product_name_or")))
    local this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data = nil
    if #this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_raw > 0 then
      this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data = helpers.to_map(this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_raw[1][2])
    end

    -- LOAD
    local this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_ent = client:ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(nil)
    local this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_match_dt0 = {}
    local this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_dt0_loaded, err = this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_ent:load(this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(this_endpoint_is_tailored_for_searches_based_on_product_name_or_ref01_data_dt0_loaded)

  end)
end)

function this_endpoint_is_tailored_for_searches_based_on_product_name_or_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/this_endpoint_is_tailored_for_searches_based_on_product_name_or/ThisEndpointIsTailoredForSearchesBasedOnProductNameOrTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read this_endpoint_is_tailored_for_searches_based_on_product_name_or test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "this_endpoint_is_tailored_for_searches_based_on_product_name_or01", "this_endpoint_is_tailored_for_searches_based_on_product_name_or02", "this_endpoint_is_tailored_for_searches_based_on_product_name_or03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID"] = idmap,
    ["CVEDB_TEST_LIVE"] = "FALSE",
    ["CVEDB_TEST_EXPLAIN"] = "FALSE",
    ["CVEDB_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["CVEDB_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["CVEDB_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["CVEDB_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["CVEDB_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
