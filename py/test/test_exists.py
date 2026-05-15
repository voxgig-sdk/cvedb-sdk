# ProjectName SDK exists test

import pytest
from cvedb_sdk import CvedbSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CvedbSDK.test(None, None)
        assert testsdk is not None
