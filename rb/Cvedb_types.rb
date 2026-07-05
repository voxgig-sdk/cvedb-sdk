# frozen_string_literal: true

# Typed models for the Cvedb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Cve entity data model.
#
# @!attribute [rw] cpe
#   @return [Array]
#
# @!attribute [rw] cve_id
#   @return [String]
#
# @!attribute [rw] cvss
#   @return [Object]
#
# @!attribute [rw] cvss_v2
#   @return [Object]
#
# @!attribute [rw] cvss_v3
#   @return [Object]
#
# @!attribute [rw] cvss_v4
#   @return [Object]
#
# @!attribute [rw] cvss_version
#   @return [Object]
#
# @!attribute [rw] epss
#   @return [Object]
#
# @!attribute [rw] kev
#   @return [Boolean]
#
# @!attribute [rw] propose_action
#   @return [Object, nil]
#
# @!attribute [rw] published_time
#   @return [String]
#
# @!attribute [rw] ranking_epss
#   @return [Object]
#
# @!attribute [rw] ransomware_campaign
#   @return [Object, nil]
#
# @!attribute [rw] reference
#   @return [Array]
#
# @!attribute [rw] summary
#   @return [Object]
Cve = Struct.new(
  :cpe,
  :cve_id,
  :cvss,
  :cvss_v2,
  :cvss_v3,
  :cvss_v4,
  :cvss_version,
  :epss,
  :kev,
  :propose_action,
  :published_time,
  :ranking_epss,
  :ransomware_campaign,
  :reference,
  :summary,
  keyword_init: true
)

# Request payload for Cve#load.
#
# @!attribute [rw] id
#   @return [String]
CveLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo entity data model.
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo
end

# Request payload for IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo#load.
class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch
end

# ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity data model.
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr
end

# Request payload for ThisEndpointIsTailoredForSearchesBasedOnProductNameOr#load.
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch
end

