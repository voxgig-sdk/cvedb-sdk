# IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity test

require "minitest/autorun"
require "json"
require_relative "../Cvedb_sdk"
require_relative "runner"

class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CvedbSDK.test(nil, nil)
    ent = testsdk.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = if_you_have_the_name_of_a_specific_software_product_and_want_to_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "if_you_have_the_name_of_a_specific_software_product_and_want_to." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.if_you_have_the_name_of_a_specific_software_product_and_want_to")))
    if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data = nil
    if if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_raw.length > 0
      if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data = Helpers.to_map(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_raw[0][1])
    end

    # LOAD
    if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(nil)
    if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0 = {}
    if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0_loaded = if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent.load(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0, nil)
    assert !if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0_loaded.nil?

  end
end

def if_you_have_the_name_of_a_specific_software_product_and_want_to_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "if_you_have_the_name_of_a_specific_software_product_and_want_to", "IfYouHaveTheNameOfASpecificSoftwareProductAndWantToTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CvedbSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["if_you_have_the_name_of_a_specific_software_product_and_want_to01", "if_you_have_the_name_of_a_specific_software_product_and_want_to02", "if_you_have_the_name_of_a_specific_software_product_and_want_to03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID" => idmap,
    "CVEDB_TEST_LIVE" => "FALSE",
    "CVEDB_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CVEDB_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = CvedbSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CVEDB_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CVEDB_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
