-- Cvedb SDK error

local CvedbError = {}
CvedbError.__index = CvedbError


function CvedbError.new(code, msg, ctx)
  local self = setmetatable({}, CvedbError)
  self.is_sdk_error = true
  self.sdk = "Cvedb"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CvedbError:error()
  return self.msg
end


function CvedbError:__tostring()
  return self.msg
end


return CvedbError
