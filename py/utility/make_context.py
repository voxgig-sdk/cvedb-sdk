# Cvedb SDK utility: make_context

from core.context import CvedbContext


def make_context_util(ctxmap, basectx):
    return CvedbContext(ctxmap, basectx)
