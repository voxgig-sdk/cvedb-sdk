-- Typed models for the Cvedb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cve
---@field cpe table
---@field cve_id string
---@field cvss any
---@field cvss_v2 any
---@field cvss_v3 any
---@field cvss_v4 any
---@field cvss_version any
---@field epss any
---@field kev boolean
---@field propose_action? any
---@field published_time string
---@field ranking_epss any
---@field ransomware_campaign? any
---@field reference table
---@field summary any

---@class CveLoadMatch
---@field id string

---@class IfYouHaveTheNameOfASpecificSoftwareProductAndWantTo

---@class IfYouHaveTheNameOfASpecificSoftwareProductAndWantToLoadMatch

---@class ThisEndpointIsTailoredForSearchesBasedOnProductNameOr

---@class ThisEndpointIsTailoredForSearchesBasedOnProductNameOrLoadMatch

local M = {}

return M
