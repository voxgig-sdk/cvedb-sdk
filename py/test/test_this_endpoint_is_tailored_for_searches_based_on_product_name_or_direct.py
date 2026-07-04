# ThisEndpointIsTailoredForSearchesBasedOnProductNameOr direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from cvedb_sdk import CvedbSDK
from core import helpers
from test import runner


class TestThisEndpointIsTailoredForSearchesBasedOnProductNameOrDirect:

    def test_should_direct_load_this_endpoint_is_tailored_for_searches_based_on_product_name_or(self):
        setup = _this_endpoint_is_tailored_for_searches_based_on_product_name_or_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-this_endpoint_is_tailored_for_searches_based_on_product_name_or", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]


        result = client.direct({
            "path": "cves",
            "method": "GET",
            "params": {},
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx. Skip
            # rather than fail when the load endpoint isn't reachable
            # with the IDs we can construct from setup.idmap.
            if result.get("err") is not None:
                pytest.skip(f"load call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("load call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _this_endpoint_is_tailored_for_searches_based_on_product_name_or_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "CVEDB_TEST_THIS_ENDPOINT_IS_TAILORED_FOR_SEARCHES_BASED_ON_PRODUCT_NAME_OR_ENTID": {},
        "CVEDB_TEST_LIVE": "FALSE",
    })

    live = env.get("CVEDB_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
        }
        client = CvedbSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = CvedbSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
