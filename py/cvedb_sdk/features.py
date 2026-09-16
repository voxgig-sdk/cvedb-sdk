# Cvedb SDK feature factory

from cvedb_sdk.feature.base_feature import CvedbBaseFeature
from cvedb_sdk.feature.ratelimit_feature import CvedbRatelimitFeature
from cvedb_sdk.feature.retry_feature import CvedbRetryFeature
from cvedb_sdk.feature.test_feature import CvedbTestFeature
from cvedb_sdk.feature.timeout_feature import CvedbTimeoutFeature


_FEATURES = {
    "base": lambda: CvedbBaseFeature(),
    "ratelimit": lambda: CvedbRatelimitFeature(),
    "retry": lambda: CvedbRetryFeature(),
    "test": lambda: CvedbTestFeature(),
    "timeout": lambda: CvedbTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
