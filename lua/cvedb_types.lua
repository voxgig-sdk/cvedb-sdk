-- Typed models for the Cvedb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cve
---@field cpes table
---@field cve_id string
---@field cvss any
---@field cvss_v2 any
---@field cvss_v3 any
---@field cvss_v4 any
---@field cvss_version any
---@field epss any
---@field id? string
---@field kev boolean
---@field propose_action? any
---@field published_time string
---@field ranking_epss any
---@field ransomware_campaign? any
---@field references table
---@field summary any

---@class CveLoadMatch
---@field id string

---@class IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

---@class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch
---@field count? boolean
---@field limit? number
---@field product string
---@field skip? number

---@class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

---@class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch
---@field count? boolean
---@field cpe23? any
---@field end_date? any
---@field is_kev? boolean
---@field limit? number
---@field product? any
---@field skip? number
---@field sort_by_epss? boolean
---@field start_date? any

local M = {}

return M
