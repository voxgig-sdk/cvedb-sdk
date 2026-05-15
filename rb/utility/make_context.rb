# Cvedb SDK utility: make_context
require_relative '../core/context'
module CvedbUtilities
  MakeContext = ->(ctxmap, basectx) {
    CvedbContext.new(ctxmap, basectx)
  }
end
