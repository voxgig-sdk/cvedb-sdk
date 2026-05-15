# Cvedb SDK exists test

require "minitest/autorun"
require_relative "../Cvedb_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CvedbSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
