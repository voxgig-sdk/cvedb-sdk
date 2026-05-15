# Cvedb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CvedbFeatures
  def self.make_feature(name)
    case name
    when "base"
      CvedbBaseFeature.new
    when "test"
      CvedbTestFeature.new
    else
      CvedbBaseFeature.new
    end
  end
end
