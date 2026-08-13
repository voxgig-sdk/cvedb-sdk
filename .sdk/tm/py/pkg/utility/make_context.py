# Cvedb SDK utility: make_context

from projectname_sdk.core.context import CvedbContext


def make_context_util(ctxmap, basectx):
    return CvedbContext(ctxmap, basectx)
