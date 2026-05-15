package = "voxgig-sdk-cvedb"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/cvedb-sdk.git"
}
description = {
  summary = "Cvedb SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["cvedb_sdk"] = "cvedb_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
