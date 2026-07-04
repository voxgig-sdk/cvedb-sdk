# IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from cvedb_sdk import CvedbSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestIfYouHaveTheNameOfASpecificSoftwareProductAndWantToEntity:

    def test_should_create_instance(self):
        testsdk = CvedbSDK.test(None, None)
        ent = testsdk.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _if_you_have_the_name_of_a_specific_software_product_and_want_to_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "if_you_have_the_name_of_a_specific_software_product_and_want_to." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.if_you_have_the_name_of_a_specific_software_product_and_want_to")))
        if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data = None
        if len(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_raw) > 0:
            if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data = helpers.to_map(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_raw[0][1])

        # LOAD
        if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent = client.IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(None)
        if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0 = {}
        if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0_loaded = if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_ent.load(if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_match_dt0, None)
        assert if_you_have_the_name_of_a_specific_software_product_and_want_to_ref01_data_dt0_loaded is not None



def _if_you_have_the_name_of_a_specific_software_product_and_want_to_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/if_you_have_the_name_of_a_specific_software_product_and_want_to/IfYouHaveTheNameOfASpecificSoftwareProductAndWantToTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CvedbSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["if_you_have_the_name_of_a_specific_software_product_and_want_to01", "if_you_have_the_name_of_a_specific_software_product_and_want_to02", "if_you_have_the_name_of_a_specific_software_product_and_want_to03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID": idmap,
        "CVEDB_TEST_LIVE": "FALSE",
        "CVEDB_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("CVEDB_TEST_IF_YOU_HAVE_THE_NAME_OF_A_SPECIFIC_SOFTWARE_PRODUCT_AND_WANT_TO_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("CVEDB_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = CvedbSDK(helpers.to_map(merged_opts))

    _live = env.get("CVEDB_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CVEDB_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
