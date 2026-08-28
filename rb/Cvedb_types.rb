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
# @!attribute [rw] cpes
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
# @!attribute [rw] id
#   @return [String, nil]
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
# @!attribute [rw] references
#   @return [Array]
#
# @!attribute [rw] summary
#   @return [Object]
Cve = Struct.new(
  :cpes,
  :cve_id,
  :cvss,
  :cvss_v2,
  :cvss_v3,
  :cvss_v4,
  :cvss_version,
  :epss,
  :id,
  :kev,
  :propose_action,
  :published_time,
  :ranking_epss,
  :ransomware_campaign,
  :references,
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
#
# @!attribute [rw] count
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] product
#   @return [String]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch = Struct.new(
  :count,
  :limit,
  :product,
  :skip,
  keyword_init: true
)

# ThisEndpointIsTailoredForSearchesBasedOnProductNameOr entity data model.
class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr
end

# Request payload for ThisEndpointIsTailoredForSearchesBasedOnProductNameOr#load.
#
# @!attribute [rw] count
#   @return [Boolean, nil]
#
# @!attribute [rw] cpe23
#   @return [Object, nil]
#
# @!attribute [rw] end_date
#   @return [Object, nil]
#
# @!attribute [rw] is_kev
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] product
#   @return [Object, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
#
# @!attribute [rw] sort_by_epss
#   @return [Boolean, nil]
#
# @!attribute [rw] start_date
#   @return [Object, nil]
ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch = Struct.new(
  :count,
  :cpe23,
  :end_date,
  :is_kev,
  :limit,
  :product,
  :skip,
  :sort_by_epss,
  :start_date,
  keyword_init: true
)

