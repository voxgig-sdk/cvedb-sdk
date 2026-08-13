# Cvedb SDK feature factory

from cvedb_sdk.feature.base_feature import CvedbBaseFeature
from cvedb_sdk.feature.test_feature import CvedbTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CvedbBaseFeature(),
        "test": lambda: CvedbTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
