# Cvedb SDK utility: feature_add
module CvedbUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
