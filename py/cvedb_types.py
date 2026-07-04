# Typed models for the Cvedb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CveRequired(TypedDict):
    cpe: list
    cve_id: str
    cvss: Any
    cvss_v2: Any
    cvss_v3: Any
    cvss_v4: Any
    cvss_version: Any
    epss: Any
    kev: bool
    published_time: str
    ranking_epss: Any
    reference: list
    summary: Any


class Cve(CveRequired, total=False):
    propose_action: Any
    ransomware_campaign: Any


class CveLoadMatch(TypedDict):
    id: str


class IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo(TypedDict):
    pass


class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch(TypedDict):
    pass


class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr(TypedDict):
    pass


class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch(TypedDict):
    pass
