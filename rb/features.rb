# Cvedb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CvedbFeatures
  def self.make_feature(name)
    case name
    when "base"
      CvedbBaseFeature.new
    when "ratelimit"
      CvedbRatelimitFeature.new
    when "retry"
      CvedbRetryFeature.new
    when "test"
      CvedbTestFeature.new
    when "timeout"
      CvedbTimeoutFeature.new
    else
      CvedbBaseFeature.new
    end
  end
end
