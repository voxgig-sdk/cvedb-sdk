# Typed models for the Cvedb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Cve:
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
    propose_action: Optional[Any] = None
    ransomware_campaign: Optional[Any] = None


@dataclass
class CveLoadMatch:
    id: str


@dataclass
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo:
    pass


@dataclass
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch:
    pass


@dataclass
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr:
    pass


@dataclass
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch:
    pass

